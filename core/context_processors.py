from .models import Sermon

def live_sermon(request):
    return {
        "live_sermon": Sermon.objects.filter(is_live=True).first()
    }
