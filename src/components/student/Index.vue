<template>
  <div>
    <h2>List User</h2>
    <el-table v-loading="loading" :data="data" style="width: 100%">
      <el-table-column prop="name" label="Name" sortable>
        <template slot-scope="scope">{{scope.row.name}} {{scope.row.lastName}}</template>
      </el-table-column>
      <el-table-column prop="bio" label="Description" width="500" sortable></el-table-column>
      <el-table-column align="righ">
        <template slot-scope="scope">
          <el-button @click="$router.push(`/students/${scope.row.studentId}/edit`)">Edit</el-button>
          <el-button type="danger" @click="remove(scope.row.studentId)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "StudentIndex",
  data() {
    return {
      data: [],
      loading: false
    };
  },
  created() {
    let seft = this;
    seft.getAll();
  },
  methods: {
    remove(id) {
      let seft = this;
      seft.$confirm(
          "This will permanently delete the file. Continue?",
          "Warning",
          {
            confirmButtonText: "OK",
            cancelButtonText: "Cancel",
            type: "warning"
          }
        )
        .then(() => {
          _remove();
          seft.$message({
            type: "success",
            message: "Delete successfully"
          });
        })
        .catch(() => {
          seft.$message({
            type: "info",
            message: "Delete canceled"
          });
        });
      function _remove() {
        seft.$store.state.services.studentService
          .remove(id)
          .then(r => {
            seft.loading = false;
            seft.getAll();
          })
          .catch(r => {
            seft.$message({
              message: "error",
              type: "error"
            });
          });
      }
    },

    getAll() {
      let seft = this;
      seft.loading = true;
      seft.$store.state.services.studentService
        .getAll()
        .then(r => {
          seft.loading = false;
          seft.data = r.data;
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