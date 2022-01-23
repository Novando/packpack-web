<template>
	<div class="modal fade" id="modal-create-form">
		<div class="modal-dialog modal-lg">
			<form @submit.prevent="add" class="modal-content" enctype="multipart/form-data">
				<div class="modal-header">
					<h4 class="modal-title">Tambah Produk Baru</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="form-group">
						<label for="name">Kategori</label>
						<select class="custom-select" v-model="category">
							<option value=''>Ready Product</option>
							<option v-for="attribute in attributes" :key="attribute.id" :value="attribute.id">
								{{attribute.shape}}, {{attribute.material}}, {{attribute.length}}x{{attribute.width}}
							</option>
						</select>
					</div>
					<div class="form-group">
						<label for="name">Nama</label>
						<input type="text" class="form-control" id="name" v-model="name">
					</div>
					<div class="form-group">
						<label for="variant">Varian</label>
						<input type="text" class="form-control" id="variant" v-model="variant">
					</div>
					<div class="form-group">
						<label for="price">Harga</label>
						<input type="text" class="form-control" id="price" v-model="price">
					</div>
					<div class="form-group">
						<label for="weight">Berat</label>
						<input type="text" class="form-control" id="weight" v-model="weight">
					</div>
					<div class="form-group">
						<label for="description">Deskripsi</label>
						<input type="text" class="form-control" id="description" v-model="description">
					</div>
					<div class="form-group">
						<label for="mainImg">Gambar Produk</label>
						<div class="custom-file">
							<input type="file" ref="mainImg" name="mainImg" class="custom-file-input" id="mainImg" @change="selectMainImg">
							<label class="custom-file-label" for="productImg">Choose file</label>
						</div>
					</div>
					<div class="form-group">
						<label for="otherImgs">Gambar Galery Produk</label>
						<div class="custom-file">
							<input type="file" ref="otherImgs" name="otherImgs" class="custom-file-input" id="otherImgs" @change="selectOtherImgs">
							<label class="custom-file-label" for="customFile">Choose file</label>
						</div>
					</div>
					<div class="form-group">
						<label for="designFiles">File Desain (SVG, AI atau PDF)</label>
						<div class="custom-file">
							<input type="file" ref="designFiles" name="designFiles" class="custom-file-input" id="designFiles" @change="selectDesignFiles">
							<label class="custom-file-label" for="customFile">Choose file</label>
						</div>
					</div>
				</div>
				<div class="modal-footer justify-content-between">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					<button type="submit" class="btn btn-primary">Submit</button>
				</div>
					<p v-if="!status">{{ msg }}</p>
					<p v-else>Atribut baru telah tersimpan</p>
			</form>
		</div>
	</div>
	<div v-if="edit" class="modal fade" id="modal-edit-form">
		<div class="modal-dialog modal-lg">
			<form @submit.prevent="editProduct(edit.id)" class="modal-content" enctype="multipart/form-data">
				<div class="modal-header">
					<h4 class="modal-title">Tambah Produk Baru</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="form-group">
						<label for="name">Kategori</label>
						<select class="custom-select" v-model="edit.prodAtrbId">
							<option :value="edit.prodAtrbId" disabled selected hidden>TIDAK BERUBAH</option>
							<option value=''>Ready Product</option>
							<option v-for="attribute in attributes" :key="attribute.id" :value="attribute.id">
								{{attribute.shape}}, {{attribute.material}}, {{attribute.length}}x{{attribute.width}}
							</option>
						</select>
					</div>
					<div class="form-group">
						<label for="name">Nama</label>
						<input type="text" class="form-control" id="name" v-model="edit.name">
					</div>
					<div class="form-group">
						<label for="variant">Varian</label>
						<input type="text" class="form-control" id="variant" v-model="edit.variant">
					</div>
					<div class="form-group">
						<label for="price">Harga</label>
						<input type="text" class="form-control" id="price" v-model="edit.price">
					</div>
					<div class="form-group">
						<label for="weight">Berat</label>
						<input type="text" class="form-control" id="weight" v-model="edit.weight">
					</div>
					<div class="form-group">
						<label for="description">Deskripsi</label>
						<input type="text" class="form-control" id="description" v-model="edit.description">
					</div>
				</div>
				<div class="modal-footer justify-content-between">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					<button type="submit" class="btn btn-primary">Submit</button>
				</div>
					<p v-if="!status">{{ msg }}</p>
					<p v-else>Atribut baru telah tersimpan</p>
			</form>
		<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
	<!-- /.modal -->


	<div class="content-wrapper">
		<section class="content">
			<div class="container-fluid">

				<!-- /.row -->
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Responsive Hover Table</h3>

                <div class="card-tools">
                  <div class="input-group input-group-sm" style="width: 150px;">
                    <input type="text" name="table_search" class="form-control float-right" placeholder="Search">

                    <div class="input-group-append">
                      <button type="submit" class="btn btn-default">
                        <i class="fas fa-search"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
								<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-create-form">
									Tambah Attribut Baru
								</button>

                <table class="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Kategori</th>
                      <th>Nama</th>
                      <th>Berat</th>
                      <th>Gambar</th>
                      <th>Tersedia?</th>
                      <th>Harga</th>
                      <th>Editor</th>
                      <th>Terakhir Diedit</th>
                      <th>Tindakan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="product in products" :key="product.id">
                      <td>{{ product.id }}</td>
                      <td v-if="!product.prodAtrbId">Ready Product</td>
											<td v-else>{{ product.prodAtrbId }}</td>
                      <td>{{ product.name }} - {{ product.variant }}</td>
                      <td>{{ product.weight }}kg</td>
                      <td>
												<img :src="$store.state.apiUrl + 'products/' + product.mainImg" class="img-fluid mb-2" :alt="product.mainImg"/>
											</td>
                      <td v-if="product.stock">Tersedia</td>
                      <td v-else>Kosong</td>
                      <td>Rp{{ product.price }}</td>
                      <td>{{ product.modifiedBy }}</td>
                      <td>{{ product.updatedAt }}</td>
                      <td>
                        <button type="button" @click="openEdit(product.id)" class="btn btn-primary" data-toggle="modal" data-target="#modal-edit-form">
                          <i class="fas fa-edit"></i>
                        </button>
                        <button type="button" @click="remove(product.id)" class="btn btn-danger">
                          <i class="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
        </div>
			</div>
		</section>
	</div>
</template>

<script>
	import ProductController from '@/controllers/ProductController.js'
	import ProductAttributeController from '@/controllers/ProductAttributeController.js'

	export default {
		name: 'Products',
		data(){
			return{
				name				: null,
				category 		: null,
				edit 				: null,
				attributes	: null,
				variant			: null,
				description	: null,
				weight 			: null,
				price 			: null,
				mainImg			: null,
				otherImgs		: null,
				designFiles	: null,
				products		: null,
				status 			: false,
				msg 				: null,
			}
		},

		async mounted() {
			this.products 	= (await ProductController.print()).data
			this.attributes = (await ProductAttributeController.show()).data
		},

		methods: {
			selectMainImg() {
				this.mainImg = this.$refs.mainImg.files[0]
			},

			selectOtherImgs() {
				this.otherImgs = this.$refs.otherImgs.files[0]
			},

			selectDesignFiles() {
				this.designFiles = this.$refs.designFiles.files[0]
			},

      async remove(id){
        await ProductController.remove(id)
        this.products = (await ProductController.print()).data
      },

      async openEdit(id){
        this.edit = (await ProductController.show(id)).data
      },

      async editProduct(id){
        await ProductController.edit(id, {
					prodAtrbId: this.edit.prodAtrbId,
					name: this.edit.name,
					variant: this.edit.variant,
					price: this.edit.price,
					weight: this.edit.weight,
					description: this.edit.description,
        })
        this.products 	= (await ProductController.print()).data
				this.attributes = (await ProductAttributeController.show()).data
      },

			async add() {
				try {
					const formData = new FormData()
					formData.append('mainImg', this.mainImg)
					formData.append('otherImgs', this.otherImgs)
					formData.append('designFiles', this.designFiles)
					formData.append('prodAtrbId', this.category)
					formData.append('name', this.name)
					formData.append('variant', this.variant)
					formData.append('description', this.description)
					formData.append('price', this.price)
					formData.append('weight', this.weight)
					formData.append('page', 'products')

          await ProductController.add(formData)
          this.products 	= (await ProductController.print()).data
					this.attributes = (await ProductAttributeController.show()).data
          this.status = true
        } catch(err) {
					this.status = false
					console.log(err)
          this.msg = 'Error: ' + err.response.data.msg
        }
      },
		}
	};
</script>