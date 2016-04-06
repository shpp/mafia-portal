@if ($errors->any())

<div class="card-panel red lighten-1">
	<ul>

		@foreach($errors->all() as $error)

		<li class="white-text">{{ $error }}</li>

		@endforeach

	</ul>
</div>

@endif