<template>
 <body class="hold-transition login-page">
  <div class="login-box">
    <div class="login-logo">
      <a href="../../index2.html">
        <b>Admin</b>LTE
      </a>
    </div>
    <!-- /.login-logo -->
    <div class="card">
      <router-view></router-view>
    </div>
  </div>
</body>
</template
   
   <script>
    export default {
        name: "auth"
    }
</script>