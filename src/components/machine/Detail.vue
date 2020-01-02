<template>
  <div>
    <!-- <header-content></header-content> -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="text-danger">Machine Detail {{this.$route.params.id}}</h1>
            <el-button type="success" plain>STANDARD: {{minstandard}} - {{standard}}</el-button>
            <el-button type="success" plain>LOCATION: {{location}}</el-button>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li class="breadcrumb-item active">Machine Detail</li>
            </ol>
          </div>
        </div>
      </div>
      <!-- /.container-fluid -->
    </section>
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-6">
            <!-- GAUGET CHART -->
            <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">RPM Meter</h3>
              </div>
              <div class="card-body">
                <div class="chart">
                  <JqxGauge
                    ref="myGauge"
                    @valueChanging="onValueChanging($event)"
                    :ranges="ranges"
                    :ticksMinor="ticksMinor"
                    :ticksMajor="ticksMajor"
                    :value="0"
                    :colorScheme="'scheme05'"
                    :animationDuration="1200"
                    :max="1000"
                    :labels="labels"
                  ></JqxGauge>
                  <div ref="gaugeValue" class="gaugeValue"></div>
                </div>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col (LEFT) -->
          <div class="col-md-6">
            <!-- LINE CHART -->
            <div class="card card-info">
              <div class="card-header">
                <h3 class="card-title">RPM Chart</h3>
              </div>
              <div class="card-body">
                <div class="chart">
                  <line-chart :chart-data="datacollection" :options="options"></line-chart>
                </div>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col (RIGHT) -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </section>
    <h1>History Data</h1>

    <div class="block">
      <el-date-picker
        v-model="value"
        type="daterange"
        align="right"
        start-placeholder="Start Date"
        end-placeholder="End Date"
        @change="gettime(value)"
      ></el-date-picker>
      <el-button type="success" plain @click="exportExcel()">Export Excel</el-button>
    </div>

    <el-table :data="data2" style="width: 100%"  :row-class-name="tableRowClassName">
      <el-table-column prop="no" label="No." width="50" sortable></el-table-column>
      <el-table-column prop="date" label="Date" width="250" sortable></el-table-column>

      <el-table-column prop="startTime" label="Start Time " width="210" sortable></el-table-column>

      <el-table-column prop="endTime" label=" End Time" width="210" sortable></el-table-column>

      <el-table-column prop="rpm" label="RPM AVG" width="200" sortable></el-table-column>

      <el-table-column prop="minutes"  label="Minutes" width="200" sortable></el-table-column>
    </el-table>
  </div>
  <!-- /.content -->
</template>

<script>
import JqxGauge from "jqwidgets-scripts/jqwidgets-vue/vue_jqxgauge.vue";
import JqxLinearGauge from "jqwidgets-scripts/jqwidgets-vue/vue_jqxlineargauge.vue";
import LineChart from "../js/LineChart";
import HeaderContent from "../shared/HeaderContent";
import moment from "moment";

export default {
  name: "MachineDetail",

  components: {
    LineChart,
    JqxGauge,
    HeaderContent
  },

  data() {
    return {
      value: [this.$route.params.start, this.$route.params.end] ,
      temp: [],
      data: [],
      data2: [],
      standard: 0,
      location: '',
      minstandard:0,
      uri: "",
      abc: true,
      loading: false,
      message: "",
      datacollection: {},
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              display: false
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                min: 0
              }
            }
          ]
        }
      },
      RPM: 0,

      display: false,

      machineID: "",
      ticksMinor: { interval: 5, size: "5%" },
      ticksMajor: { interval: 10, size: "9%" },
      labels: { interval: 100 },
      ranges: [
        {
          startValue: 0,
          endValue: 500,
          style: { fill: "red", stroke: "red" },
          endWidth: 13,
          startWidth: 13
        },
        {
          startValue: 500,
          endValue: 1000,
          style: { fill: "#4bb648", stroke: "#4bb648" },
          endWidth: 16,
          startWidth: 13
        }
      ],

      rangesLinear: [
        {
          startValue: -10,
          endValue: 10,
          style: { fill: "#FFF157", stroke: "#FFF157" }
        },
        {
          startValue: 10,
          endValue: 35,
          style: { fill: "#FFA200", stroke: "#FFA200" }
        },
        {
          startValue: 35,
          endValue: 60,
          style: { fill: "#FF4800", stroke: "#FF4800" }
        }
      ]
    };
  },
  created() {
    let seft = this;
    this.$socket.emit("C", this.abc);

    seft.get(seft.$route.params.id);
    seft.fillData();
    // seft.$refs.myGauge.value = 0;
    //seft.gaugechart();
    // console.log(seft.RPM);
  },
  mounted: function() {
    // this.$refs.myGauge.value = r.RPM;
  },
  sockets: {
    connect: function() {
      console.log("socket connected");
    },
    customEmit: function(data) {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)'
      );
    },
    welcome(data) {
      this.machineID = data.id;

      let id = this.$route.params.id;
      if (this.machineID == id) {
        //  this.display = true;
        this.get(this.$route.params.id);
        this.gaugechart();

        this.fillData();

        console.log(this.display);
      }
      // this.message = data.message
      // console.log(data);
    }
  },
  watch: {
    value: function(newVal, oldVal) {
      this.gettime(newVal);
    }
  },
  methods: {
    tableRowClassName({row}) {
      if (row.rpm < this.standard & row.rpm > this.minstandard ) {
        return 'success-row'
      } else  {
        return 'warning-row'
      }
      
       
    },
    onValueChanging: function(event) {
      this.$refs.gaugeValue.innerHTML = Math.round(event.args.value) + " RPM";
    },
    fillData() {
      let seft = this;
      seft.linechart();
      this.datacollection = {
        labels: seft.data,
        datasets: [
          {
            label: "RPM Speed",
            borderColor: "#08872f",
            backgroundColor: "transparent",
            data: seft.data
          }
        ]
      };
      // console.log(seft.data);
    },
    get(id) {
      if (id == undefined) return;
      let seft = this;
      seft.loading = true;
      seft.$store.state.services.machineService
        .get(id)
        .then(r => {
          seft.loading = false;

          seft.data2 = r.data.model;
          console.log(seft.data2);
          // r.data.model.forEach(i => {
          //   console.log(i.status);
          //   seft.tableRowClassName(i.status=true?"warning-row":"success-row");
          // });

          // console.log(seft.data2[0].rpm);
          seft.standard = r.data.standard;
          seft.location = r.data.location;
          seft.minstandard = r.data.minstandard;
        })
        .catch(r => {
          // seft.$message({
          //   message: "error",
          //   type: "error"
          // });
        });
    },

    linechart() {
      // debugger
      let id = this.$route.params.id;
      if (id == undefined) return;
      let seft = this;
      seft.loading = true;
      seft.$store.state.services.linechartService
        .getchart(id)
        .then(r => {
          seft.loading = false;
          console.log(r.data);
          r.data.map(item => {
            seft.data.push(item);
            // seft.labels.push(item.createddatetime);
          });
          seft.data = r.data;
          seft.fillData();
        })
        .catch(r => {
          // seft.$message({
          //   message: "error",
          //   type: "error"
          // });
        });
    },

    gaugechart() {
      // debugger

      let seft = this;
      //seft.display = false;
      let id = this.$route.params.id;
      if (id == undefined) return;

      seft.loading = true;
      seft.$store.state.services.machineService
        .getrpm(id)
        .then(r => {
          seft.loading = false;
          //debugger;

          seft.RPM = r.data.rpm;
          // console.log(seft.display);

          seft.$refs.myGauge.value = r.data.rpm;

          // return seft.data;
          console.log(seft.data.RPM);
        })
        .catch(r => {
          // seft.$message({
          //   message: "error",
          //   type: "error"
          // });
        });
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
    gettime(value = this.value) {
      // debugger

      let id = this.$route.params.id;
      if (id == undefined) return;
      let seft = this;

      let vm = value;
      // console.log(vm);
      // console.log(this.getDate(vm[0]));

      seft.$store.state.services.machineService
        .gettime(id, seft.getDate(vm[0]), seft.getDate(vm[1]))
        .then(r => {
          // console.log(r.data.model);
          seft.loading = false;
          // console.log(r.data);
          r.data.model.map(item => {
            seft.data2.push(item);
            // seft.labels.push(item.createddatetime);
          });
          seft.data2 = r.data.model;
          seft.fillData();
        })
        .catch(r => {
          // seft.$message({
          //   message: "error",
          //   type: "error"
          // });
        });
    },

    exportExcel(value = this.value) {
      let id = this.$route.params.id;
      if (id == undefined) return;
      let seft = this;

      let vm = value;
      let start = seft.getDate(vm[0]),
        end = seft.getDate(vm[1]),
        mypromise;
      // console.log(vm);
      // console.log(this.getDate(vm[0]));
      if (end == NaN && start == NaN) {
        mypromise = new Promise((resolve, reject) => {
          resolve(
            (window.location.href = `http://10.4.4.224:8092/raw/exportexcel/${id}`)
          );
        });
      } else if (end == NaN) {
        mypromise = new Promise((resolve, reject) => {
          resolve(
            (window.location.href = `http://10.4.4.224:8092/raw/exportexcel/${id}/${start}`)
          );
        });
      } else {
        mypromise = new Promise((resolve, reject) => {
          resolve(
            (window.location.href = `http://10.4.4.224:8092/raw/exportexcel/${id}/${start}/${end}`)
          );
        });
      }
      console.log(mypromise);

      mypromise.then(x => {
        seft.$message({
          message: "success",
          type: "success"
        });
      });
    }
  }
};
</script>

<style>
.el-table .warning-row {
  background: #851441;
  color: #f3f3f3;
}
.el-table--enable-row-hover .el-table__body tr:hover>td {
  background-color: transparent;
}


.el-table .success-row {
  background: #2e854b;

  color: #f3f3f3;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
.gaugeValue {
  background-image: -webkit-gradient(
    linear,
    50% 0%,
    50% 100%,
    color-stop(0%, #fafafa),
    color-stop(100%, #f3f3f3)
  );
  background-image: -webkit-linear-gradient(#fafafa, #f3f3f3);
  background-image: -moz-linear-gradient(#fafafa, #f3f3f3);
  background-image: -o-linear-gradient(#fafafa, #f3f3f3);
  background-image: linear-gradient(#fafafa, #f3f3f3);
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  -webkit-box-shadow: 0 0 50px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0 0 50px rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.2);
  padding: 10px;
  position: absolute;
  top: 290px;
  left: 140px;
  font-family: Sans-Serif;
  text-align: center;
  font-size: 17px;
  width: 70px;
}
</style>