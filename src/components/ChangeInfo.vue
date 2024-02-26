<template>
    <div class="top-window">
        <div class="info-bar">
            <p>Mã chuyến bay</p>
            <p>Điểm đi</p>
            <p>Điểm đến</p>
            <p>Giờ xuất phát</p>
            <p>Chỗ trống</p>
        </div>
        <div class="column-data"></div>
    </div>
    <div class="middle-info">
        <div class="bottom-line">
            <p class="title">Tên</p>
            <p class="input-hybrid" >
                <input v-model="nameCustomerInput" type="text" name="email" placeholder="Tên">
            </p>
        </div>
        <div class="bottom-line">
            <p class="title">SĐT</p>
            <p class="input-hybrid">
                <input v-model="phoneCustomerInput" type="text" name="email" placeholder="Số điện thoại">
            </p>
        </div>
        <div class="bottom-line">
            <p class="title">Email</p>
            <p class="input-hybrid">
                <input  v-model="emailCustomerInput" type="text" name="email" placeholder="Email cá nhân">
            </p>
        </div>
    </div>
    <div class="bottom">
        <div class="bottom-left">
            <div>Mã số đặt vé</div>
            <input v-model="bookCodeInput" type="text" name="book-code" placeholder="Mã số đặt vé">
        </div>
        <div class="bottom-right">
            <button @click="getInfo">Lấy thông tin</button>
            <button @click="changeInfo">Thay đổi thông tin</button>
            <button @click="deleteBooking">Huỷ đặt chỗ</button>
        </div>
    </div>
</template>

<script setup>
    import {ref, watch, computed} from 'vue';
    import {checkValidInput} from '../utils/ValidInput.js';
    import {isPopupVisible, notiContent} from './shareData.js';
    import axios from 'axios';

    const bookInfoApi = 'http://127.0.0.1:8000/booking/get_book'

    var bookCodeInput = ref(null)
    var infoUserBook = ref(null)
    var nameCustomerInput = ref(null)
    var phoneCustomerInput = ref(null)
    var emailCustomerInput = ref(null)

    async function getInfo() {

        if (bookCodeInput.value == null) {
            isPopupVisible.value = true
            notiContent.value = 'Bạn cần điền thông tin vé để tìm thông tin đặt vé'
        }

        const params = {
            "id": bookCodeInput.value,
        };
        
        try {
            var response = await axios.get(bookInfoApi, {
                headers: {
                    'Accept': 'application/json'
                },
                params: params,
            });
        } catch (error) {
            // check if book code is exits
            isPopupVisible.value = true
            notiContent.value = 'Mã chuyến bay không tồn tại'
        }

        var response = await axios.get(bookInfoApi, {
            headers: {
                'Accept': 'application/json'
            },
            params: params,
        });
        infoUserBook.value = response.data['flight']

        // show value
        nameCustomerInput.value = infoUserBook.value['name'] 
        phoneCustomerInput.value = infoUserBook.value['phone'] 
        emailCustomerInput.value = infoUserBook.value['email'] 
    }

    async function deleteBooking() {
        const deleteBookingApi = 'http://127.0.0.1:8000/booking/delete_info'
        
        if (bookCodeInput.value == null) {
            isPopupVisible.value = true
            notiContent.value = 'Bạn cần điền thông tin vé để tìm thông tin đặt vé'
        }
        
        const params = {
            "id": bookCodeInput.value,
        };

        try {
            var response = await axios.get(bookInfoApi, {
                headers: {
                    'Accept': 'application/json'
                },
                params: params,
            });
        } catch (error) {
            // check if book code is exits
            isPopupVisible.value = true
            notiContent.value = 'Mã chuyến bay không tồn tại'
            return
        }

        var response = await axios.delete(deleteBookingApi, {
            headers: {
                'Accept': 'application/json'
            },
            params: params,
        });
        
        isPopupVisible.value = true
        notiContent.value = 'Xoá thông tin thành công'
        bookCodeInput.value = null
    }


    async function changeInfo() {
        const changeInfoApi = 'http://127.0.0.1:8000/booking/update_info'

        var checkValueBox = checkValidInput([
            bookCodeInput.value,
            nameCustomerInput.value,
            phoneCustomerInput.value,
            emailCustomerInput.value
        ])

        if (checkValueBox == false) {
            isPopupVisible.value = true
            notiContent.value = 'Bạn cần điền thông tin vé để tìm thông tin đặt vé'
        }

        const data = {
            'booking_id': bookCodeInput.value,
            'name': nameCustomerInput.value,
            'phone': phoneCustomerInput.value,
            'email': emailCustomerInput.value,
        }

        const params = {
            "id": bookCodeInput.value,
        };

        try {
            var response = await axios.get(bookInfoApi, {
                headers: {
                    'Accept': 'application/json'
                },
                params: params,
            });
        } catch (error) {
            // check if book code is exits
            isPopupVisible.value = true
            notiContent.value = 'Mã chuyến bay không tồn tại'
            return
        }

        const response_put = await axios.put(changeInfoApi, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        isPopupVisible.value = true
        notiContent.value = 'Thay đổi thông tin thành công'

        nameCustomerInput.value = null
        phoneCustomerInput.value = null
        emailCustomerInput.value = null

    }

</script>
<style scoped src="../assets/change_info.css" ></style>
