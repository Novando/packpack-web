<template>
  <section id="hero">
    <div class="hero min-h-screen" style="background-image: url('/assets/img/hero.jpg');">
      <div class="text-center hero-content">
        <div class="max-w-md">
          <p class="mb-5">
            Produk naik kelas, bersama
          </p> 
          <h1 class="mb-5 text-5xl font-bold">
            PackPack
          </h1>
          <button class="btn btn-primary">Pesan Sekarang</button>
        </div>
      </div>
    </div>
  </section>

  <section id="selling-point" class="px-40 py-20 text-center">
    <h1 class="poppins text-5xl pb-20">Kenapa Pilih <span class="font-extrabold">PackPack</span></h1>
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

  <section id="customer-logo" class="px-40 py-20 bg-gradient-to-r from-sky-300 to-indigo-600">
    <div class="grid grid-cols-3 gap-10 items-center">
      <figure class="grid justify-items-center">
        <img src="assets/img/custom-design.png">
      </figure>
      <div class="col-span-2">
        <h3 class="poppins text-zinc-100 text-5xl pb-5">Sudah punya desain <span class="font-extrabold">Pack</span>aging sendiri?</h3>
        <p class="text-zinc-100 pb-10">
          Buat label kemasan custom sesuai dengan ketentuan dan keinginan Anda sendiri. Upload desain Anda, kami akan membantu mewujudkannya.
        </p>
        <router-link :to="{ name: 'Custom' }" class="btn">Mulai Sekarang</router-link>
      </div>
    </div>
  </section>
  
  <section id="custom-design" class="px-40 py-20">
    <div class="grid grid-cols-4 gap-24 items-center">
      <figure class="grid justify-items-center">
        <img class="grayscale hover:grayscale-0 w-44" src="assets/img/customer/01.svg">
      </figure>
      <figure class="grid justify-items-center">
        <img class="grayscale hover:grayscale-0 w-44" src="assets/img/customer/02.svg">
      </figure>
      <figure class="grid justify-items-center">
        <img class="grayscale hover:grayscale-0 w-44" src="assets/img/customer/03.svg">
      </figure>
      <figure class="grid justify-items-center">
        <img class="grayscale hover:grayscale-0 w-44" src="assets/img/customer/04.svg">
      </figure>
    </div>
  </section>

</template>

<script>
  import ProductController from '@/controllers/ProductController.js'
  import CartController from '@/controllers/CartController.js'

  export default {
    name: 'Home',
    data() {
      return {
        status      : null,
        products    : null,
        selected    : null,
        qty         : 1000,
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
  