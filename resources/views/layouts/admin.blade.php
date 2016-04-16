<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Mafia</title>

    <!-- Fonts -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css" rel='stylesheet' type='text/css'>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/css/materialize.min.css">
    <link href="{{ asset('css/admin.css') }}" rel="stylesheet">
</head>
<body>

    <nav class="grey lighten-1">
        <div class="nav-wrapper container">
            <a href="{{ url('/') }}" class="brand-logo">Mafia</a>

            @if (Auth::check())

                <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
                <ul class="right hide-on-med-and-down">
                    <li>
                        <a href="{{ route('admin.games') }}">Games</a>
                    </li>
                    <li>
                        <a href="{{ route('admin.users') }}"> Users</a>
                    </li>
                    <li>
                        <a href="{{ url('/muffin/events') }}"> Events</a>
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
                        <a href="{{ route('admin.games') }}">Games</a>
                    </li>
                    <li>
                        <a href="{{ route('admin.users') }}"> Users</a>
                    </li>
                    <li>
                        <a href="{{ url('/muffin/events') }}"> Events</a>
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

    </main>

    <footer class="page-footer grey lighten-1">
        <div class="footer-copyright">
            <div class="container">
                © {{ date('Y') }} Mafia
            </div>
        </div>
    </footer>

    @yield('after-footer')

    <!-- JavaScripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
    <!-- Compiled and minified JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/js/materialize.min.js"></script>
    <script src="{{ asset('js/app.js') }}"></script>

    @stack('footer-scripts')

</body>
</html>
