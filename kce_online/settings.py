from django.core.exceptions import ImproperlyConfigured
from dotenv import load_dotenv
from pathlib import Path
import os
import dj_database_url

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / ".env")

def get_env_variable(var_name: str) -> str:
    value = os.getenv(var_name)
    if not value:
        raise ImproperlyConfigured(f"Set the {var_name} environment variable in .env")
    return value

SECRET_KEY = get_env_variable("SECRET_KEY")

DEBUG = os.getenv("DEBUG", "False").lower() == "true"


ALLOWED_HOSTS = ["kceonline.onrender.com", "localhost", "127.0.0.1", "https://www.google.com/search?q=kceonline.onrender.com"]

# Application definition

INSTALLED_APPS = [
    # Local Apps
    'core',
    'members',
    'accounts',
    'dashboard',
    # Inbuilt Apps
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

MIDDLEWARE = [
    "whitenoise.middleware.WhiteNoiseMiddleware",
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'kce_online.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                "django.template.context_processors.debug",
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'core.context_processors.live_sermon'
            ],
        },
    },
]

WSGI_APPLICATION = 'kce_online.wsgi.application'

if DEBUG:
    # Use SQLite for local development
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3', # use locally
        }
    }
else:
    # Production on Render with Postgres
    DATABASES = {
        'default': dj_database_url.config(
            default=os.environ.get("DATABASE_URL"),
            conn_max_age=600,
            ssl_require=True,
        )
    }

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

STATIC_URL = '/static/'
STATICFILES_DIRS  = [os.path.join(BASE_DIR, 'static')] 
STATIC_ROOT = BASE_DIR / "staticfiles"

STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

# Custom User
AUTH_USER_MODEL = 'accounts.CustomUser'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Logins
LOGIN_URL = "/accounts/login/" 
LOGIN_REDIRECT_URL = "core:home"
LOGOUT_REDIRECT_URL = "core:home"

# Email Configuration
EMAIL_BACKEND = os.getenv('EMAIL_BACKEND')
EMAIL_HOST = os.getenv('EMAIL_HOST')
EMAIL_PORT = int(os.getenv('EMAIL_PORT')) # Convert to an integer
EMAIL_USE_TLS = os.getenv('EMAIL_USE_TLS', 'false').lower() == 'true' # Convert to a boolean
EMAIL_USE_SSL = os.getenv('EMAIL_USE_SSL', 'false').lower() == 'true'
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD')
DEFAULT_FROM_EMAIL = os.getenv('EMAIL_HOST_USER')
CONTACT_FORM_RECEIVER_EMAIL = os.getenv('CONTACT_FORM_RECEIVER_EMAIL')
