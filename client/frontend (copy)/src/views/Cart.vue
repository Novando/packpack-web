<template>
	<section id="catalogue" class="grid grid-cols-5">
		<section id="top-catalogue" class="col-span-5">
			asd
		</section>

		<section id="main-catalogue" class="col-span-4">
			<div id="product-catalogue" class="grid grid-cols-1 gap-10">
				<div v-for="cart in carts" :key="cart.id" class="card lg:card-side card-bordered">
					<figure>
						<img src="">
					</figure> 
					<div class="card-body">
						<h2 class="card-title">{{ products.name }}</h2> 
						<p>Sub Total : Rp {{ cart.qty * products.price }}</p> 
						<div class="card-actions">
							<button class="btn btn-primary">Get Started</button> 
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
			asd
		</section>

	</section>
</template>

<script>
	import CartController from '@/controllers/CartController.js'

	export default{
		name: 'Cart',

		data(){
			return{
				carts: null,
				products: null,
				users: null
			}
		},

		async mounted(){
			this.carts = (await CartController.showUserCart( this.$store.state.userId )).data.getCart,
			this.products = (await CartController.showUserCart( this.$store.state.userId )).data.getProduct,
			this.users = (await CartController.showUserCart( this.$store.state.userId )).data.getUser
    },
	}
</script>