<script>
	import '../app.postcss';
</script>

<svelte:head>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-6ZF06B0VGV"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-6ZF06B0VGV');
    </script>
</svelte:head>

<slot />
