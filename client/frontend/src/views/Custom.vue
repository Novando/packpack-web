<template>
	<section id="header-custom" class="px-40 py-20">
    <h3 class="text-2xl font-bold pb-5">Buat label custom</h3>
    <p>Silakan masukan spesifikasi produk yang Anda inginkan</p>
  </section>

  <form @submit.prevent="create()" enctype="multipart/form-data">
    <section id="main-custom" class="px-40 py-5">
      <h3 class="text-xl font-bold px-10 pb-5">Identitas Produk</h3>
      <div class="card glass lg:card-side py-5">
        <div class="grid grid-cols-2 card-body">
          <div class="mx-10">
          </div>
          <div class="mx-10">
            <div class="form-control pb-5">
              <label for="brand" class="label">
                <span class="label-text">Nama brand Anda :</span>
              </label>
              <input type="text" v-model="brand" @change="changed" placeholder="Your brand" id="brand" class="input input-bordered">
            </div>
            <div class="form-control pb-5">
              <label for="product" class="label">
                <span class="label-text">Nama produk Anda :</span>
              </label>
              <input type="text" v-model="product" @change="changed" placeholder="Your product" id="product" class="input input-bordered">
            </div>
            <div class="form-control pb-5">
              <label for="variant" class="label">
                <span class="label-text">Nama varian produk Anda :</span>
              </label>
              <input type="text" v-model="variant" @change="changed" placeholder="Your product variant" id="variant" class="input input-bordered">
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="main-custom" class="px-40 py-5">
      <h3 class="text-xl font-bold px-10 pb-5">Informasi teknis</h3>
      <div class="card glass lg:card-side py-5">
        <div class="grid grid-cols-2 card-body">
          <div class="mx-10">
            <div class="form-control pb-5">
              <label for="upload-design" class="btn">Upload Design</label>
              <input ref="design" name="design" type="file" @change="uploadDesign" id="upload-design" class="hidden">
            </div>
            <label v-if="!preview" for="upload-design">
              <div class="border-4 border-orange-400 rounded-3xl py-40 text-center">
                <h3>Upload</h3>
              </div>
            </label>
            <div v-else class="border-4 border-orange-400 rounded-3xl py-5 grid justify-items-center">
              <img :src="preview">
            </div>
          </div>
          <div class="mx-10">
            <div class="form-control pb-5">
              <label for="shape" class="label">
                <span class="label-text">Bentuk label Anda :</span>
              </label>
              <select v-model="shape" @change="changed" class="select select-bordered w-full max-w-xs" id="shape">
                <option disabled="disabled" selected hidden value="null">Your shape</option> 
                <option value="rectangle">Persegi</option> 
                <option value="circle">Lingkaran</option> 
              </select>
            </div>
            <div class="form-control pb-5">
              <label for="length" class="label">
                <span class="label-text">Ukuran :</span>
              </label>
              <div class="grid grid-cols-5 flex items-center">
                <input type="text" v-model="length" @change="changed" placeholder="Length" id="length" class="input input-bordered">mm
                <p>x</p>
                <input type="text" v-model="width" @change="changed" placeholder="Width" id="width" class="input input-bordered">mm
              </div>
            </div>
            <div class="form-control pb-5">
              <label for="quantity" class="label">
                <span class="label-text">Jumlah :</span>
              </label>
              <input type="text" v-model="quantity" @change="changed" placeholder="Quantity" id="quantity" class="input input-bordered">
            </div>
            <div class="form-control pb-5">
              <label for="material" class="label">
                <span class="label-text">Bahan :</span>
              </label>
              <select @change="getDescription" v-model="theMaterial" class="select select-bordered w-full max-w-xs" id="material">
                <option disabled selected hidden value="null">Your material</option> 
                <option
                  v-for="material in materials"
                  :key="material.id"
                  :value="material.id">{{ material.name }}
                </option>
              </select>
            </div>
            <div class="form-control pb-5">
              <p v-if="description"> {{ description }} </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="form-button" class="px-40 py-5 grid grid-cols-2 flex items-center">
      <div class="grid grid-cols-2 gap-10 px-10">
        <button v-if="!changed" type="submit" class="btn btn-primary">Buat</button>
        <a v-if="changed" class="btn btn-disabled">Buat</a>
        <a @click="calculate" class="btn btn-primary">Hitung</a>
      </div>
      <div class="px-10">
        <p>Harga : {{ calculatePrice.toLocaleString("id-ID", {style:"currency", currency:"IDR"}) }}</p>
        <p>Berat : {{ calculateWeight.toLocaleString("id-ID", {minimumFractionDigits: 2, maximumFractionDigits: 2}) }} kg</p>
      </div>
    </section>
  </form>
</template>

<script>
  import MaterialController from '@/controllers/MaterialController.js'
  import CustomController from '@/controllers/CustomController.js'
  import CartController from '@/controllers/CartController.js'

	export default{
		name: 'Custom',
    data() {
      return {
        brand           : null,
        product         : null,
        variant         : null,
        design          : null,
        preview         : null,
        shape           : null,
        length          : null,
        width           : null,
        quantity        : null,
        materials       : null,
        theMaterial     : null,
        description     : null,
        isChanged       : true,
        calculateWeight : 0,
        calculatePrice  : 0,
      }
    },

    async mounted() {
      this.materials = (await MaterialController.print()).data
    },

    methods: {
      changed(){
        this.isChanged = true
      },

      uploadDesign() {
        this.design   = this.$refs.design.files[0]
        this.preview  = URL.createObjectURL(this.design)
        this.isChanged  = true
      },
      
      async getDescription(){
        const theDescription  = (await MaterialController.show(this.theMaterial)).data
        this.description      = theDescription.description
        this.isChanged          = true
      },

      async calculate() {
        const getMaterial       = (await MaterialController.show(this.theMaterial)).data
        const { weight, price } = getMaterial
        const totalVariable     = this.length * this.width * this.quantity
        this.calculateWeight    = totalVariable * weight
        this.calculatePrice     = totalVariable * price
        this.changed            = false
      },

      async create() {
        try {
          const userId = this.$store.state.userId
					const formData = new FormData()
					formData.append('userId', userId)
					formData.append('shape', this.shape)
					formData.append('brandName', this.brand)
					formData.append('productName', this.product)
					formData.append('variantName', this.variant)
					formData.append('designFiles', this.design)
					formData.append('bestLength', this.length)
					formData.append('bestWidth', this.width)
          await CustomController.add(formData)

          const getProductCustomId = (await CustomController.userId({
            userId			: userId,
            shape				: this.shape,
            brandName 	: this.brand,
            productName	: this.product,
            variantName	: this.variant,
          })).data

          console.log(getProductCustomId)
          console.log(getProductCustomId.id)

          const coba = await CartController.add({
            userId          : userId,
            productCustomId : getProductCustomId.id,
            materialId      : this.theMaterial,
            width           : this.width,
            length          : this.length,
            qty             : this.quantity
          })
          console.log(coba)
        } catch(err) {
					console.log(err)
          this.msg = 'Error: ' + err.response.data.msg
        }
      },
    }
	}
</script>