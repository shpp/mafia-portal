<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Mafia</title>

    <!-- Fonts -->
    <!-- <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css" rel='stylesheet' type='text/css'> -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/css/materialize.min.css">
    <link href="{{ asset('css/admin.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('components/font-awesome.css') }}">
</head>
<body>

    <nav class="grey lighten-1">
        <div class="nav-wrapper container">
            <a href="{{ url('/') }}" class="brand-logo">Mafia</a>

            @if (Auth::check())

                <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
                <ul class="right hide-on-med-and-down">
                    <li>
                        <a href="{{ route('admin.games') }}"
                           class="{{ menuActiveRoute('admin.games') }}">Ігри</a>
                    </li>
                    <li>
                        <a href="{{ route('admin.users') }}"
                           class="{{ menuActiveRoute('admin.users') }}">Користувачі</a>
                    </li>
                    <li>
                        <a href="{{ route('admin.clubs') }}"
                           class="{{ menuActiveRoute('admin.clubs') }}">Клуби</a>
                    </li>
                    <li>
                        <a href="{{ route('admin.events') }}"
                           class="{{ menuActiveRoute('admin.events') }}">Події</a>
                    </li>
                    <li>
                        <a class="dropdown-button" href="#!" data-activates="dropdown1">
                            {{ Auth::user()->name }}
                            <i class="material-icons right">arrow_drop_down</i></a>
                        <ul id="dropdown1" class="dropdown-content">
                            <li>
                                <a href="{{ url('/muffin/logout') }}"><i class="fa fa-btn fa-sign-out"></i>Logout</a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul class="side-nav" id="mobile-demo">
                    <li>
                        <a href="{{ route('admin.games') }}"
                           class="{{ menuActiveRoute('admin.games') }}">Games</a>
                    </li>
                    <li>
                        <a href="{{ route('admin.users') }}"
                           class="{{ menuActiveRoute('admin.games') }}">Users</a>
                    </li>
                    <li>
                        <a href="{{ route('admin.clubs') }}"
                           class="{{ menuActiveRoute('admin.games') }}">Clubs</a>
                    </li>
                    <li>
                        <a href="{{ route('admin.events') }}"
                           class="{{ menuActiveRoute('admin.games') }}">Events</a>
                    </li>
                    <li>
                        <a href="{{ url('/muffin/logout') }}"><i class="fa fa-btn fa-sign-out"></i>Logout</a>
                    </li>
                </ul>

            @endif

        </div>
    </nav>

    <main>
      @yield('content')
      <div id="spinner" class="preloader-wrapper big">
          <div class="spinner-layer spinner-blue-only">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div><div class="gap-patch">
              <div class="circle"></div>
            </div><div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
      </div>
    </main>

    <footer class="page-footer grey lighten-1">
        <div class="footer-copyright">
            <div class="container">
                © {{ date('Y') }} Mafia
            </div>
        </div>
    </footer>

    @yield('after-footer')

              <!-- Modal Structure Error Ajax Request -->
    <div id="error_ajaxRequest" class="modal">
        <div class="modal-content">
            <h5>Error 422</h5>
            <p class="error_422"></p>
        </div>
    </div>

    <!-- JavaScripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
    <!-- Compiled and minified JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/js/materialize.min.js"></script>
    <script src="{{ asset('js/app.js') }}"></script>


    @stack('footer-scripts')


</body>
</html>
