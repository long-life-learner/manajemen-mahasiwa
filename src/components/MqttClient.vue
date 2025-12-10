<template >
    <div>
    <h2>MQTT Client Test</h2>
    <p>Subscribe to topic: {{ subscription.topic }}</p>
    <p>Check console for messages</p>
    <!-- card -->
     <div class="card-sensor-suhu">
        <h3>Sensor Suhu</h3>
        <p>Nilai Suhu: {{ sensor.suhu }}</p>
        <p>Waktu Update: {{ sensor.waktu }}</p>
     </div>

     <!-- toggle switch -->
      <label class="switch">
        <input type="checkbox" v-model="motor1.payload" @change="doPublishMotor(motor1.payload)" >
        <span class="slider round"></span>
        </label>
        <span>Toggle Motor 1 ({{ motor1.payload ? 'ON' : 'OFF' }})</span>


        
    </div>
</template>


<script setup>
   
import mqtt from 'mqtt';
import { onMounted, reactive, ref } from 'vue';

const connection = reactive({
  clientId: "emqx_vue3_" + Math.random().toString(16).substring(2, 8),
  username: "emqx_test",
  password: "emqx_test"
});

const { ...options } = connection


// const options = {
//     clientId : connection.clientId,
//     username : connection.username,
//     password : connection.password,
// }

const client = mqtt.connect("ws://broker.emqx.io:8083/mqtt", options);

// Topic & QoS
const subscription = ref({
  topic: ["it/sensor1", "it/motor1"],
  qos: 0 
});


const sensor = ref({
  suhu: null,
  waktu: null
});

const doSubscribe = () => {
    
  const { topic, qos } = subscription.value;
  
  client.subscribe(
    topic[0],

    { qos },

    (error, granted) => {
      if (error) {
        console.log("subscribe error:", error);
        return;
      }
      console.log("subscribe successfully:", granted);
    }
  );
  
};

const publish = ref({
  topic: "it/sensor1",
  payload: '',
  qos: 0,
});

const motor1 = ref({
  topic: "it/motor1",
  payload: false,
  qos: 0,
});

const doPublish = (payload) => {
  const { topic, qos } = publish.value;

  client.publish(topic, payload, { qos }, (error) => {
    if (error) {
      console.log("publish error:", error);
      return;
    }

    console.log(`published message: ${payload}`);
  });
};

const doPublishMotor = (payload) => {
  const { topic, qos } = motor1.value;

  client.publish(topic, payload.toString(), { qos }, (error) => {
    if (error) {
      console.log("publish error:", error);
      return;
    }

    console.log(`published motor1 message: ${payload}`);
  });
};

onMounted(() => {
  client.on("connect", () => {
    console.log("Connected to MQTT broker");
    doSubscribe();
  });

  setInterval(() => {
    const suhuRandom = (20 + Math.random() * 10).toFixed(2);
    doPublish(suhuRandom);
  }, 5000); // Publish every 1 second

  client.on("message", (topic, payload) => {
    sensor.value.suhu = payload.toString();
    sensor.value.waktu = new Date().toLocaleString();
  });

});
</script>
<style scoped >
    .card-sensor-suhu {
        box-shadow: 2px 2px 8px #333;
        border-radius: 8px;
        padding: 12px;
        margin: 10px 0;
        max-width: 300px;
    }

    /* toggle switch */
    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
        }
    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
        }
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
        }
    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
        }
    input:checked + .slider {
        background-color: #2196F3;
        }
    input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
        }
    input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
        }
    /* Rounded sliders */
    .slider.round {
        border-radius: 34px;
        }
    .slider.round:before {
        border-radius: 50%;
        }

    
</style>