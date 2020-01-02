<template>
  <div>
    <h2>{{ pageTitle }}</h2>
    <el-form v-loading="loading" :model="form" :rules="rules" ref="ruleForm">
      <el-form-item label="Name" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Last Name" prop="lastName">
        <el-input v-model="form.lastName"></el-input>
      </el-form-item>
      <el-form-item label="Description" prop="bio">
        <el-input type="textarea" v-model="form.bio"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="save" type="primary">Save</el-button>
        <el-button @click="resetForm('ruleForm')">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "StudentCreateOrUpdate",
  data() {
    return {
      loading: false,
      form: {
        studentId: 0,
        name: null,
        lastName: null,
        bio: null
      },
      rules: {
        name: [
          { required: true, message: "Please input your name" },
          { min: 3, message: "Your name must be longer than 3 characters" }
        ],
        lastName: [{ required: true, message: "Last Name must not be empty" }],
        bio: [{ required: true, message: "Description must not be empty" }]
      }
    };
  },
  computed: {
    pageTitle() {
      return this.form.studentId === 0
        ? "Add new Machine"
        : `Edit ${this.form.name}`;
    }
  },
  created() {
    let seft = this;
    seft.get(seft.$route.params.id);
  },
  methods: {
    get(id) {
      if (id == undefined) return;
      let seft = this;
      seft.loading = true;
      seft.$store.state.services.studentService
        .get(id)
        .then(r => {
          seft.loading = false;
          seft.form.studentId = r.data.studentId;
          seft.form.name = r.data.name;
          seft.form.lastName = r.data.lastName;
          seft.form.bio = r.data.bio;
        })
        .catch(r => {
          seft.$message({
            message: "error",
            type: "error"
          });
        });
    },

    resetForm(ruleForm) {
      this.$refs[ruleForm].resetFields();
    },
    save() {
      let seft = this;
      seft.$refs["ruleForm"].validate(valid => {
        if (valid) {
          seft.loading = true;
          if (seft.form.studentId > 0) {
            seft.$store.state.services.studentService
              .update(seft.form)
              .then(r => {
                seft.loading = false;
                seft.$router.push("/students");
                seft.$message({
                  message: "success",
                  type: "Update successfully"
                });
              })
              .catch(r => {
                seft.$message({
                  message: "error",
                  type: "error"
                });
              });
          } else {
            seft.$store.state.services.studentService
              .add(seft.form)
              .then(r => {
                seft.loading = false;
                seft.$router.push("/students");
                seft.$message({
                  message: "success",
                  type: "Created successfully"
                });
              })
              .catch(r => {
                seft.$message({
                  message: "error",
                  type: "error"
                });
              });
          }
        }
      });
    }
  }
};
</script>