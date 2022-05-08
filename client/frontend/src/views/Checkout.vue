<template>
	<section id="catalogue" class="grid grid-cols-5 pt-40 px-10">
		<section id="top-catalogue" class="col-span-5 px-10">
			asd
		</section>

		<section id="main-catalogue" class="card glass lg:card-side col-span-3 mx-10">
				<div class="card-body">
					<div class="form-control pb-5">
						<label for="recipient" class="label">
							<span class="label-text">Nama penerima :</span>
						</label>
						<input type="text" v-model="recipient" @change="changed" placeholder="Recipient Name" id="recipient" class="input input-bordered">
					</div>
					<div class="form-control pb-5">
						<label for="province" class="label">
							<span class="label-text">Provinsi :</span>
						</label>
						<select id="province" v-model="provinceId" @change="provinceSelected" class="select select-bordered w-full max-w-xs">
							<option disabled="disabled" selected="selected">Choose your province</option> 
							<option
								v-for="province in provinces"
								:key="province.province_id"
								:value="province.province_id"
							>{{ province.province }}</option>
						</select>
					</div>
					<div class="form-control pb-5">
						<label for="city" class="label">
							<span class="label-text">Kabupaten / Kota :</span>
						</label>
						<select id="city" @change="citySelected" v-model="cityId" class="select select-bordered w-full max-w-xs">
							<option disabled="disabled" selected="selected">Choose your city</option> 
							<option
								v-for="city in cities"
								:key="city.city_id"
								:value="city.city_id"
							>{{ city.city_name }}</option>
						</select>
					</div>
					<div class="form-control pb-5">
						<label for="distric" class="label">
							<span class="label-text">Kecamatan :</span>
						</label>
						<input type="text" v-model="district" placeholder="Distric Name" id="distric" class="input input-bordered w-full max-w-xs">
					</div>
					<div class="form-control pb-5">
						<label for="ward" class="label">
							<span class="label-text">Desa / Kelurahan :</span>
						</label>
						<input type="text" v-model="ward" placeholder="Ward Name" id="ward" class="input input-bordered w-full max-w-xs">
					</div>
					<div class="form-control pb-5">
						<label for="address1" class="label">
							<span class="label-text">Alamat :</span>
						</label>
						<input type="text" v-model="address1" @change="changed" placeholder="Line 1" id="address1" class="input input-bordered">
						<input type="text" v-model="address2" @change="changed" placeholder="Line 2" id="address2" class="input input-bordered">
					</div>
					<div class="form-control pb-5">
						<label for="zip" class="label">
							<span class="label-text">Kode pos :</span>
						</label>
						<input type="text" v-model="zip" @change="changed" placeholder="Postal code" id="zip" class="input input-bordered w-full max-w-xs">
					</div>
					<div class="form-control pb-5">
						<label for="phone" class="label">
							<span class="label-text">Nomor telepon :</span>
						</label>
						<input type="text" v-model="phone" @change="changed" placeholder="Phone number" id="phone" class="input input-bordered w-full max-w-xs">
					</div>
			</div>
		</section>

		<section id="right-catalogue col-span-2 px-10">
			<p>Berat 	: {{ totalWeight.toLocaleString("id-ID", {minimumFractionDigits: 2, maximumFractionDigits: 2}) }} kg</p>
			<p>Harga 	: {{ totalPrice.toLocaleString("id-ID", {style:"currency", currency:"IDR"}) }}</p>
			<p>Ongkos	: {{ totalShipping.toLocaleString("id-ID", {style:"currency", currency:"IDR"}) }}</p>
			<p>Total	: {{ bill.toLocaleString("id-ID", {style:"currency", currency:"IDR"}) }}</p>
			<router-link @click="process" :to="{ name: 'Checkout' }" class="btn btn-primary">Checkout</router-link>
		</section>

	</section>
</template>

<script>
	import CartController from '@/controllers/CartController.js'
	import RajaongkirController from '@/controllers/RajaongkirController.js'

	export default{
		name: 'Checkout',

		data(){
			return{
				products				: null,
				provinces				: null,
				provinceId			: null,
				cities 					: null,
				cityId 					: null,
				cityAvailable 	: false,
				district 				: null,
				recipient 			: null,
				ward 						: null,
				address1				: null,
				address2				: null,
				zip							: null,
				phone						: null,
				totalPrice			: 0,
				totalWeight			: 0,
				totalShipping 	: 0,
				bill						: 0,
			}
		},

		async mounted(){
			this.provinces 	= (await RajaongkirController.printProvince()).data
			// this.address 		= (await )
			this.products = (await CartController.show({ userId : this.$store.state.userId })).data
			let datum = 0
			while (this.products[datum]) {
				this.totalPrice 	= this.totalPrice + (this.products[datum].price * this.products[datum].width * this.products[datum].length * this.products[datum].qty)
				this.totalWeight 	= this.totalWeight + (this.products[datum].weight * this.products[datum].width * this.products[datum].length * this.products[datum].qty)
				datum++
			}
    },

    methods: {
      async provinceSelected(){
        this.cities = (await RajaongkirController.showCity({ id : this.provinceId })).data
				this.cityAvailable = true
      },
			async citySelected(){
				console.log(this.cityId)
				console.log(this.totalWeight)
				this.zip = (await RajaongkirController.setZip({ id : this.cityId})).data.postal_code
				const shipping = (await RajaongkirController.showCost({
					destination : this.cityId,
					weight 			: this.totalWeight
				})).data
				this.totalShipping = shipping.value
				this.cityAvailable = true
			},
			async process(){
				// orders{
				// 	invoice:,
				// 	email:,
				// 	username:,
				// 	recipient:,
				// 	country:,
				// 	province:,
				// 	city:,
				// 	district:,
				// 	ward:,
				// 	address1:,
				// 	address2:,
				// 	zip:,
				// 	paymentMethod:,
				// 	shipment:,
				// 	shimpentCost:,
				// 	status:,
				// }
				// orderDetails{
				// 	orderId:,
				// 	productId:,
				// 	productName:,
				// 	materialId:,
				// 	materialName:,
				// 	length:,
				// 	width:,
				// 	weight:,
				// 	subtotal:,
				// }
			}
		}
	}
</script>