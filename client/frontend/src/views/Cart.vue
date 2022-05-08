<template>
	<section id="catalogue" class="grid grid-cols-5 pt-40 px-10">
		<section id="top-catalogue" class="col-span-5">
			asd
		</section>

		<section id="main-catalogue" class="col-span-4">
			<div id="product-catalogue" class="grid grid-cols-1 gap-10">
				<div v-for="product in products" :key="product.id" class="card lg:card-side card-bordered">
					<figure class="m-10 object-contain">
						<img class="object-contain h-40 w-40" v-if="product.mainImg" :src="$store.state.apiUrl + 'products/previews/' + product.mainImg">
						<img class="object-contain h-40 w-40" v-else :src="$store.state.apiUrl + 'custom_products/' + product.designFiles">
					</figure> 
					<div class="card-body">
						<h2 v-if="product.name" class="card-title">{{ product.name }}</h2>
						<h2 v-else class="card-title">{{ product.brandName }}</h2>
						<p>Harga : {{ 
							(product.price * product.width * product.length * product.qty)
							.toLocaleString("id-ID", {style:"currency", currency:"IDR"}) 
						}}</p>
						<p>Berat : {{
							(product.weight * product.width * product.length * product.qty)
							.toLocaleString("id-ID", {minimumFractionDigits: 2, maximumFractionDigits: 2})
						}} kg</p>
						<div class="card-actions">
							<button class="btn btn-ghost">More info</button>
						</div>
					</div>
				</div>
			</div>

			<div id="pagination-catalogue">
				asd
			</div>
		</section>

		<section id="right-catalogue">
			<p>Total Harga : {{ totalPrice.toLocaleString("id-ID", {style:"currency", currency:"IDR"}) }}</p>
			<p>Total Berat : {{ totalWeight.toLocaleString("id-ID", {minimumFractionDigits: 2, maximumFractionDigits: 2}) }} kg</p>
			<router-link :to="{ name: 'Checkout' }" class="btn btn-primary">Checkout</router-link>
		</section>

	</section>
</template>

<script>
	import CartController from '@/controllers/CartController.js'

	export default{
		name: 'Cart',

		data(){
			return{
				products		: null,
				totalPrice	: 0,
				totalWeight	: 0
			}
		},

		async mounted(){
			console.log(this.$store.state.userId)
			this.products = (await CartController.show({ userId : this.$store.state.userId })).data
			let datum = 0
			while (this.products[datum]) {
				this.totalPrice 	= this.totalPrice + (this.products[datum].price * this.products[datum].width * this.products[datum].length * this.products[datum].qty)
				this.totalWeight 	= this.totalWeight + (this.products[datum].weight * this.products[datum].width * this.products[datum].length * this.products[datum].qty)
				datum++
			}
    },
	}
</script>