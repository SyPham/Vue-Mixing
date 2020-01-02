<template>
  <div>
    <h2>List Machine</h2>
    <el-table v-loading="loading" :data="data" style="width: 100%">
      <el-table-column prop="machineID" label="MachineID" sortable>
        <template slot-scope="scope">{{scope.row.machineID}}</template>
      </el-table-column>
      <el-table-column prop="description" label="Description" width="200" sortable></el-table-column>
      <el-table-column prop="locationname" label="Location" width="200" sortable></el-table-column>
      <el-table-column align="righ">
        <template slot-scope="scope">
          <el-button
            type="success"
            @click="$router.push(`/machines/${scope.row.machineID}/edit`)"
          >Edit</el-button>
          <el-button type="primary" @click="getRoute(scope.row.machineID)">Detail</el-button>
          <!-- <el-button type="primary" @click="$router.push(`/machines/${scope.row.machineID}/${scope.start}/${scope.end}/detail`)">Detail</el-button>           -->
          <!-- <el-button type="danger" @click="remove(scope.row.machineID)">Delete</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "MachineIndex",
  data() {
    return {
      data: [],
      loading: false,
      start: "",
      end: ""
    };
  },
  created() {
    let seft = this;
    seft.getAll();
    //this.start = this.getDate(new Date.now());
    //this.end = this.getDate(new Date.now());
    // this.$socket.on("initgetAPI",data => {
    //   vm.weather = data.query.result.channel;
    // });
  },
  methods: {
    remove(id) {
      let seft = this;
      seft
        .$confirm(
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
        seft.$store.state.services.rawService
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
    getRoute(machineID) {
      this.start = this.getDate(Date.now());
      this.end = this.getDate(Date.now());
      return this.$router.push(`/machines/${machineID}/${this.start}/${this.end}/detail`
      );
    },
    getDate: function(dateTime) {
      var nowDate = new Date(dateTime);
      return (
        nowDate.getFullYear() +
        "-" +
        (nowDate.getMonth() + 1) +
        "-" +
        nowDate.getDate()
      );
    },
    getAll() {
      let seft = this;
      seft.loading = true;
      seft.$store.state.services.machineService
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