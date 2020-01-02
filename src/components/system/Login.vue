<template>
  <!-- <div id="signin">
    <div class="signin-form">
      <form @submit.prevent="handleSubmit">
        <div class="input">
          <label for="username">Username</label>
          <input type="username" name="username" v-model="username" />
        </div>
        <div class="input">
          <label for="password">Password</label>
          <input type="password" name="password" v-model="password" />
        </div>
        <div class="submit">
          <button type="submit" >Login</button>
        </div>
      </form>
    </div>
  </div>-->
  <div class="card-body login-card-body">
    <p class="login-box-msg">Sign in to start your session</p>
    <form  method="post" @submit.prevent="handleSubmit">
      <div class="input-group mb-3">
        <input type="email" class="form-control" placeholder="Email" />
        <div class="input-group-append">
          <div class="input-group-text">
            <span class="fas fa-envelope"></span>
          </div>
        </div>
      </div>
      <div class="input-group mb-3">
        <input type="password" class="form-control" placeholder="Password" />
        <div class="input-group-append">
          <div class="input-group-text">
            <span class="fas fa-lock"></span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-8">
          <div class="icheck-primary">
            <input type="checkbox" id="remember" />
            <label for="remember">Remember Me</label>
          </div>
        </div>
        <!-- /.col -->
        <div class="col-4">
          <button type="submit" class="btn btn-primary btn-block">Sign In</button>
        </div>
        <!-- /.col -->
      </div>
    </form>

    <div class="social-auth-links text-center mb-3">
      <p>- OR -</p>
      <a href="#" class="btn btn-block btn-primary">
        <i class="fab fa-facebook mr-2"></i> Sign in using Facebook
      </a>
      <a href="#" class="btn btn-block btn-danger">
        <i class="fab fa-google-plus mr-2"></i> Sign in using Google+
      </a>
    </div>
    <!-- /.social-auth-links -->

    <p class="mb-1">
      <a href="forgot-password.html">I forgot my password</a>
    </p>
    <p class="mb-0">
      <a href="register.html" class="text-center">Register a new membership</a>
    </p>
  </div>
  <!-- /.login-card-body -->
</template>

<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    handleSubmit(e) {
      this.$router.push("/");
    }
  }
};
</script>

