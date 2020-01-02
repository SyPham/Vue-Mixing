<template>
  <div>
    <h2>{{ pageTitle }}</h2>
    <el-form v-loading="loading" :model="form" :rules="rules" ref="ruleForm">
      <el-form-item label="Location Name" prop="locationName">
        <el-input v-model="form.locationName"></el-input>
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
  name: "LocationCreateOrUpdate",
  data() {
    return {
      loading: false,
      form: {
        locationId: 0,
        locationName: null
      },
      rules: {
        name: [
          { required: true, message: "Please input your name" },
          { min: 3, message: "Your name must be longer than 3 characters" }
        ]
      }
    };
  },
  computed: {
    pageTitle() {
      return this.form.locationId === 0
        ? "Add new Location"
        : `Edit ${this.form.locationName}`;
    }
  },
  created() {
    let seft = this;
    seft.get(seft.$route.params.id);
  },
  methods: {
    // get(id) {
    //   if (id == undefined) return;
    //   let seft = this;
    //   seft.loading = true;
    //   seft.$store.state.services.studentService
    //     .get(id)
    //     .then(r => {
    //       seft.loading = false;
    //       seft.form.studentId = r.data.studentId;
    //       seft.form.name = r.data.name;
    //       seft.form.lastName = r.data.lastName;
    //       seft.form.bio = r.data.bio;
    //     })
    //     .catch(r => {
    //       seft.$message({
    //         message: "error",
    //         type: "error"
    //       });
    //     });
    // },

    resetForm(ruleForm) {
      this.$refs[ruleForm].resetFields();
    },
    save() {
      let seft = this;
      seft.$refs["ruleForm"].validate(valid => {
        if (valid) {
          seft.loading = true;
          if (seft.form.locationId > 0) {
            seft.$store.state.services.locationService
              .update(seft.form)
              .then(r => {
                seft.loading = false;
                seft.$router.push("/machines");
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
            seft.$store.state.services.locationService
              .add(seft.form)
              .then(r => {
                seft.loading = false;
                seft.$router.push("/machines");
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