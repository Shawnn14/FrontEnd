<template>
    <div class="top-window">
        <div class="info-bar">
            <p>Mã chuyến bay</p>
            <p>Điểm đi</p>
            <p>Điểm đến</p>
            <p>Giờ xuất phát</p>
            <p>Chỗ trống</p>
        </div>
        <div class="column-data">
            <div v-for="value in flightList" class="each-flight">
                <p>{{ value._id }}</p>
                <p>{{ value.departure }}</p>
                <p>{{ value.arrival }}</p>
                <p>{{ value.max_seat }}</p>
                <p>{{ value.empty_seat }}</p>
            </div>
        </div>
    </div>
    <div class="bottom">
        <div class="bottom-left">
            <div class="bottom-line">
                <p>Mã chuyến bay</p>
            </div>
            <div class="bottom-line">
                <p>Tên</p>
            </div>
            <div class="bottom-line">
                <p>SĐT</p>
            </div>
            <div class="bottom-line">
                <p>Email</p>
            </div>
        </div>
        <div class="bottom-mid">
            <div class="bottom-line">
                <input v-model="flightCodeInput" type="text" name="flightCode" placeholder="Mã chuyến bay">
            </div>
            <div class="bottom-line">
                <input v-model="nameCustomerInput" type="text" name="username" placeholder="Tên">
            </div>
            <div class="bottom-line">
                <input v-model="phoneCustomerInput" type="text" name="phoneNumber" placeholder="Số điện thoại">
            </div>
            <div class="bottom-line">
                <input v-model="emailCustomerInput" type="text" name="email" placeholder="Email cá nhân">
            </div>
        </div>
        <div class="bottom-right">
            <button @click="bookFlight">Đặt chỗ</button>
        </div>
    </div>
</template>
<script setup>
    import {ref, watch, computed} from 'vue';
    import {isPopupVisible, notiContent} from './shareData.js';
    import {checkValidInput} from '../utils/ValidInput.js';

    import axios from 'axios';

    var flightList = ref()
    const flightsApi = 'http://127.0.0.1:8000/booking/get_list_flight'
    const bookFlightApi = 'http://127.0.0.1:8000/booking/booking_flight'
    const eachFlightApi = 'http://127.0.0.1:8000/booking/get_flight'
    
    async function getFlights() {
        var response = await axios.get(flightsApi, {
            headers: {
            'Accept': 'application/json'
            },
        });

        flightList.value = response.data['flight']
    }

    getFlights()

    var flightCodeInput = ref(null)
    var nameCustomerInput = ref(null)
    var phoneCustomerInput = ref(null)
    var emailCustomerInput = ref(null)

    async function bookFlight() {

        // check valied in input 
        var checkValueBox = checkValidInput([
            flightCodeInput.value,
            nameCustomerInput.value,
            phoneCustomerInput.value,
            emailCustomerInput.value
        ])

        if (checkValueBox == false) {
            isPopupVisible.value = true
            notiContent.value = 'Bạn cần điền đủ trường thông tin cần thiết để đặt vé'
            return
        }

        // check if flight code is exits and if any seat exits
        const params = {
            "id": flightCodeInput.value,
        };

        const eachFlight = await axios.get(eachFlightApi, {
            headers: {
                'Content-Type': 'application/json',
            },
            params: params,
        });

        if (eachFlight.data['flight'] == null) {
            isPopupVisible.value = true
            notiContent.value = 'Mã chuyến bay không tồn tại'
            return
        }

        if (eachFlight.data['flight']['empty_seat'] == 0) {
            isPopupVisible.value = true
            notiContent.value = 'Chuyến bay đã hết chỗ'
            return
        }
        
        // send booking flight to server
        const data = {
            'flight_code': flightCodeInput.value,
            'name': nameCustomerInput.value,
            'phone': phoneCustomerInput.value,
            'email': emailCustomerInput.value,
        }

        const response = await axios.post(bookFlightApi, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // show popup value
        isPopupVisible.value = true
        var keyData = Object.keys(response.data) 
        if (keyData == 'id_booking') {
            notiContent.value = 'Bạn đã đặt vé thành công, mã đặt vé của bạn là: ' + response.data[keyData]
        }

        flightCodeInput.value = null
        nameCustomerInput.value = null
        phoneCustomerInput.value = null
        emailCustomerInput.value = null
    }

</script>
<style scoped src="../assets/line_info.css" ></style>
