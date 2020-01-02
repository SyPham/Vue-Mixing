<template>
  <div>
    <el-form v-loading="loading" :model="form" :rules="rules" ref="ruleForm">
      <h2>Edit Machine {{form.machineID}}</h2>
      <el-form-item  label="Machine ID" prop="machineID">
        <el-input :disabled="true" v-model="form.machineID"></el-input>
      </el-form-item>
      <el-form-item label="Description" prop="description">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="Location " prop="locationID">
        <el-select v-model="form.locationID" placeholder="Select">
          <el-option
            v-for="item in data"
            :key="item.value"
            :label="item.locationname"
            :value="item.id"
          ></el-option>
        </el-select>
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
  name: "MachineUpdate",
  data() {
    return {
      loading: false,
      form: {
        Id: 0,
        machineID: null,
        description: null,
        locationID: ""
      },
      data: [],

      rules: {
        machineID: [
          { required: true, message: "Please input machineID" },
          { min: 3, message: "Your name must be longer than 3 characters" }
        ],
        description: [
          { required: true, message: "Description must not be empty" }
        ]
      }
    };
  },
  computed: {
    //  pageTitle() {
    //   return this.$route.params.id === undefined
    //     ? "Add new Machine"
    //     : `Edit ${this.form.machineID}`;
    // }
  },
  created() {
    let seft = this;
    seft.getlocation(seft.$route.params.id);
    seft.get(seft.$route.params.id);
  },
  methods: {
    get(id) {
      if (id == undefined) return;
      let seft = this;
      seft.loading = true;
      seft.$store.state.services.rawService
        .get(id)
        .then(r => {
          seft.loading = false;
          seft.form.machineID = r.data.data.machineID;
          seft.form.description = r.data.data.description;
          seft.form.locationID = r.data.data.locationID;
          console.log(r.data);
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
      this.$router.push("/machines");
    },
    save() {
      let seft = this;
      seft.$refs["ruleForm"].validate(valid => {
        if (valid) {
          seft.loading = true;
          seft.$store.state.services.rawService
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
        }
      });
    },
    getlocation(id = this.Id) {
      let seft = this;
      seft.loading = true;
      seft.$store.state.services.rawService
        .getlocation(id)
        .then(r => {
          seft.loading = false;
          seft.data = r.data.location;
          // console.log(seft.data)
        })
        .catch(r => {
          seft.$message({
            message: "error",
            type: "error"
          });
        });
    }
  }
};
</script>