from django.shortcuts import render, redirect, get_object_or_404,HttpResponseRedirect
from .models import Bot
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from .models import Bot, Log
import json
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Recaptcha, Song

from .tasks import run_music_scrape_bot

@csrf_exempt
@require_POST
def change_status(request, bot_id):
    try:

        bot = Bot.objects.get(id=bot_id)
        data = json.loads(request.body)

        # Extract Status ad save to database
        new_status = data.get('status')
        bot.status = new_status
        bot.save()

        if new_status in dict(Bot.Status.choices):

            print(new_status)
            if new_status == "AE":
                active_log = Log(log_details=f"The Bot is now active ")
                active_log.save()

            else:
                idle_log = Log(log_details=f"The Bot is now Idle ")
                idle_log.save()

            return JsonResponse({"message": "Status updated successfully."}, status=200)
        else:
            return JsonResponse({"message": "Invalid status value."}, status=400)

        # return redirect("authenticator:dashboard")

    except Bot.DoesNotExist:
        return JsonResponse({"message": "Bot not found."}, status=404)


@login_required(login_url='/authenticate/')
def clear_logs(request):
    logs = Log.objects.all()
    logs.delete()

    return redirect('authenticator:dashboard')


# Get logs every 5 seconds woth Js fetch request
def get_logs(request):
    logs = Log.objects.all()
    # recent_logs = logs[:5]

    # Data for recent logs
    # recent_log_data = [
    #     {
    #         "counter": idx + 1, "details": log.log_details,
    #         "created": log.created.strftime('%Y-%m-%d %H:%M:%S')
    #     }
    #     for idx, log in enumerate(recent_logs)
    # ]

    # Data for all logs
    all_log_data = [
        {
            "counter": idx + 1,
            "details": log.log_details,
            "created": log.created.strftime('%Y-%m-%d %H:%M:%S')
        }
        for idx, log in enumerate(logs)
    ]

    return JsonResponse(
        {
            "all_logs": all_log_data
        },
        safe=False
    )


def get_songs(request):
    run_music_scrape_bot(repeat=10 * 60)
    # Get all songs from the database
    all_songs = Song.objects.all()
    new_songs = all_songs

    # Data for recent logs
    new_songs_data = [
        {
            "counter": idx + 1,
            "title": song.title,
            "artist": song.artist,
            "link": song.download_link
        }
        for idx, song in enumerate(new_songs)
    ]

    # Data for all logs
    # all_songs_data = [
    #     {
    #         # "counter": idx + 1,
    #         "title": title,
    #         "artist": artist,
    #         "link": link,
    #     }
    #     for title, artist, link in enumerate(all_songs)
    # ]

    return JsonResponse(
        {
            "recent_songs": new_songs_data,
            # "all_songs": all_songs_data
        },
        safe=False
    )


# views.py

