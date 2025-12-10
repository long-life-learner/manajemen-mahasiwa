<template >
    <!-- MOTOR WITH ANIMATION -->
    <div class="motor-container">
        <div :class="['motor', motor1.payload ? 'motor-on' : 'motor-off']">
            <div class="motor-body">
                <div class="motor-shaft"></div>
            </div>
        </div>
    </div>

    <audio controls ref="audioElement"  id="motor-sound" style="display: none;">

        <source src="../assets/motor-sound.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
    </audio>
    
    <!-- SENSOR WITH GRAPH -->
    <!-- <div class="sensor-container">
        <h3>Sensor Suhu</h3>
        <p>Suhu Terkini: {{ sensor.suhu ? sensor.suhu + ' °C' : 'Tidak ada data' }}</p>
        <div class="graph-placeholder">
            <p>Graph akan ditampilkan di sini</p>
        </div>
    </div> -->


     
</template>
<script setup>
const audioElement = ref(null);

import mqtt from 'mqtt';
import { onMounted, reactive, ref } from 'vue';

    const motor1 = ref({
        topic: "it/motor1",
        payload: false,
        qos: 0,
    });

    const connection = reactive({
        clientId: "emqx_vue3_" + Math.random().toString(16).substring(2, 8),
        username: "emqx_test",
        password: "emqx_test"
        });


    const { ...options } = connection

    const client = mqtt.connect("ws://broker.emqx.io:8083/mqtt", options);

    const doSubcribeMotor = () => {
        const { topic, qos } = motor1.value;

        client.subscribe(
            topic,
            { qos },
            (error) => {
                if (error) {
                    console.log("Subscribe to motor1 error", error);
                } else {
                    console.log("Subscribe to motor1 success");
                }
            }
        );
    };

    
const playAudio = () => {
    if (audioElement.value) {
        audioElement.value.currentTime = 0;
        audioElement.value.play().catch(err => {
            console.log("Error playing audio:", err);
        });
    }
};

const stopAudio = () => {
    if (audioElement.value) {
        audioElement.value.pause();
        audioElement.value.currentTime = 0;
    }
};

    onMounted(() => {
        client.on("connect", () => {
            console.log("Connected to MQTT broker");
            doSubcribeMotor();
        });

        client.on("message", (topic, payload) => {
            motor1.value.payload = payload.toString() === 'true';
            if(payload.toString() === 'true'){
                playAudio();
            } else {
                stopAudio();
            }
        });
    });
</script>

<style scoped>
    .motor-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
    }
    .motor {
        width: 100px;
        height: 100px;
        border: 5px solid #333;
        border-radius: 10px;
        position: relative;
        transition: background-color 0.5s;
    }
    .motor-on {
        background-color: #4CAF50;
        animation: rotate 2s linear infinite;
    }
    .motor-off {
        background-color: #f44336;
    }
    .motor-body {
        width: 60px;
        height: 60px;
        background-color: #777;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 5px;
    }
    .motor-shaft {
        width: 10px;
        height: 40px;
        background-color: #333;
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
    }
    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    .sensor-container {
        text-align: center;
    }
    .graph-placeholder {
        width: 100%;
        height: 200px;
        border: 2px dashed #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
    }




</style>