<template>
  <!-- PRODUCT MODAL -->
  <div v-if="selected" id="product-modal" class="modal">
    <div class="modal-box">
      <h3 class="jakarta-bold text-4xl mb-4">{{ selected.name }} - {{ selected.variant }}</h3>
      <div class="grid grid-cols-2">
        <img class="h-40" :src="$store.state.apiUrl + 'products/' + selected.mainImg">
        <div class="form-control">
          <label for="qty" class="label">
            <span class="label-text">Jumlah :</span>
          </label> 
          <input id="qty" placeholder="Qty" class="input input-bordered" type="number" v-model="qty" min="1000">
          <p class="mt-4">Total : Rp {{ selected.price * qty }}</p>
        </div>
      </div>
      <h5 class="mt-8">Deskripsi :</h5>
      <p class="mt-2">{{ selected.description }}</p>
      <div class="modal-action">
        <button v-if="$store.state.userId" @click="add($store.state.userId, selected.id, qty)" class="btn btn-primary">Add to Cart</button>
        <p v-else>Login First!!!</p>
        <a href="#" class="btn ">Close</a>
      </div>
      <p v-if="status">{{ msg }}</p>
    </div>
  </div>

  <section id="hero">
    <Splide :options="options">
      <SplideSlide v-for="banner in banners" :key="banner.alt">
        <img :src="banner.src" :alt="banner.alt">
      </SplideSlide>
    </Splide>
  </section>

  <section id="selling-point" class="container w-screen px-40 py-20 text-center">
    <h1 class="poppins text-5xl pb-20">Kenapa Pilih <span class="font-extrabold">Kita</span></h1>
    <div class="grid grid-cols-4 gap-10 items-start">
      <figure class="grid justify-items-center">
        <img class="pb-5" src="assets/img/usp1.svg">
        <h3 class="font-semibold poppins pb-10">Banyak pilihan label</h3>
        <figcaption>
          Template desain label sudah disiapkan, siapkan saja logo dan nama merek serta informasi produk anda
        </figcaption>
      </figure>
      <figure class="grid justify-items-center">
        <img class="pb-5" src="assets/img/usp2.svg">
        <h3 class="font-semibold poppins pb-10">Bikin label custom</h3>
        <figcaption>
          Anda bisa membuat desain sendiri jika merasa kurang cocok dengan template yang kami siapkan
        </figcaption>
      </figure>
      <figure class="grid justify-items-center">
        <img class="pb-5" src="assets/img/usp3.svg">
        <h3 class="font-semibold poppins pb-10">Konsultasi label</h3>
        <figcaption>
          Konsultasikan label anda dengan tim kami untuk menghasilkan label terbaik yang bisa anda terima
        </figcaption>
      </figure>
      <figure class="grid justify-items-center">
        <img class="pb-5" src="assets/img/usp4.svg">
        <h3 class="font-semibold poppins pb-10">Visualisasi produk</h3>
        <figcaption>
          Lihat dan bayangkan kemasan produk anda dengan 3D Visualizer yang kami sediakan
        </figcaption>
      </figure>
    </div>
  </section>

  <!-- <section id="how-to-order" class="container px-40 py-20">
    <h1 class="poppins text-5xl pb-20 text-center">Cara <span class="font-extrabold">Kita</span> Pesan</h1>
    <div>
      <figure>
        <img src="">
        <figcaption>
          1. Cari desain yang cocok
        </figcaption>
      </figure>
      <figure>
        <img src="">
        <figcaption>
          2. Berikan informasi produk
        </figcaption>
      </figure>
      <figure>
        <img src="">
        <figcaption>
          3. Lakukan pembayaran
        </figcaption>
      </figure>
      <figure>
        <img src="">
        <figcaption>
          4. Pesanan anda dalam perjalanan
        </figcaption>
      </figure>
    </div>
  </section> -->

  <section id="our-design" class="container px-40 py-20">
    <h1 class="poppins text-5xl pb-20 text-center">Produk <span class="font-extrabold">Kita</span></h1>
    <div class="grid grid-cols-4 gap-10">
      <a v-for="product in products" @click="showProduct(product.id)" :key="product.id" href="#product-modal">
        <img :src="$store.state.apiUrl + 'products/' + product.mainImg">
      </a>
    </div>
  </section>
      <!-- <img src="assets/img/product.jpg">
      <img src="assets/img/product.jpg">
      <img src="assets/img/product.jpg">
      <img src="assets/img/product.jpg">
      <img src="assets/img/product.jpg"> -->

  <!-- <section id="testimonial" class="container px-40 py-20 grid grid-cols-3">
    <div id="testimonial-slider" class="col-span-2 splide">
      <div class="splide__track">
        <ul class="splide__list">
          <li class="splide__slide grid grid-rows-2">
            <figure class="grid grid-cols-2">
              <img src="">
              <figcaption>
                <h5>Mr. Andrey</h5>
                <p>Designer</p>
              </figcaption>
            </figure>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div>
      What our customers says
    </div>
  </section> -->
</template>

<script>
  import { Splide, SplideSlide } from '@splidejs/vue-splide'
  import '@splidejs/splide/dist/css/splide.min.css'
  import ProductController from '@/controllers/ProductController.js'
  import CartController from '@/controllers/CartController.js'

  export default {
    name: 'Home',
    components: {
      Splide,
      SplideSlide,
    },
    data() {
      return {
        status      : null,
        products    : null,
        selected    : null,
        qty         : 1000,
        options: {
          rewind      : true,
          gap         : '1rem',
          autoplay    : true,
          pauseOnHover: false,
          arrows      : 'slider',
        },
        banners: [
          {src: 'assets/img/banner1.jpg', alt: 'Banner 1'},
          {src: 'assets/img/banner2.jpg', alt: 'Banner 2'},
          {src: 'assets/img/banner3.jpg', alt: 'Banner 3'},
          {src: 'assets/img/banner4.jpg', alt: 'Banner 4'},
        ],
      };
    },

    async mounted(){
      this.products = (await ProductController.print()).data
    },

    methods: {
      async showProduct(id){
        this.selected = (await ProductController.show(id)).data
      },

      async add(userId, productId, qty){
        try{
          await CartController.addCart({
            userId      : userId,
            productId   : productId,
            qty         : qty
          })
        } catch(err) {
          console.log(err)
        }
      }
    }
  }

</script>
  