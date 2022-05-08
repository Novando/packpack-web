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
						<label for="category">Kategori</label>
						<input type="text" class="form-control" id="category" v-model="category">
					</div>
					<div class="form-group">
						<label for="shape">Bentuk</label>
						<input type="text" class="form-control" id="shape" v-model="shape">
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
						<label for="description">Deskripsi</label>
						<input type="text" class="form-control" id="description" v-model="description">
					</div>
					<div class="form-group">
						<label for="length">Ukuran Optimal</label>
						<div class="row">
							<div class="col-1">
								<input type="text" id="length" class="form-control" v-model="bestLength">
							</div>mm
							<p class="col-1 text-center">x</p>
							<div class="col-1">
								<input type="text" id="width" class="form-control" v-model="bestWidth">
							</div>mm
						</div>
					</div>
					<div class="form-group">
						<label for="tags">Tag</label>
						<input type="text" class="form-control" id="tags" v-model="tags">
						<p>Pisahkan dengan spasi</p>
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
					<h4 class="modal-title">Edit Produk ID {{ edit.id }}</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="form-group">
						<label for="category">Kategori</label>
						<input type="text" class="form-control" id="category" v-model="edit.category">
					</div>
					<div class="form-group">
						<label for="shape">Bentuk</label>
						<input type="text" class="form-control" id="shape" v-model="edit.shape">
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
						<label for="description">Deskripsi</label>
						<input type="text" class="form-control" id="description" v-model="edit.description">
					</div>
					<div class="form-group">
						<label for="length">Ukuran Optimal</label>
						<div class="row">
							<div class="col-1">
								<input type="text" id="length" class="form-control" v-model="edit.bestLength">
							</div>mm
							<p class="col-1 text-center">x</p>
							<div class="col-1">
								<input type="text" id="width" class="form-control" v-model="edit.bestWidth">
							</div>mm
						</div>
					</div>
					<div class="form-group">
						<label for="tags">Tag</label>
						<input type="text" class="form-control" id="tags" v-model="edit.tags">
						<p>Pisahkan dengan spasi</p>
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
                <h3 class="card-title">Product Custom</h3>

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
								<!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-create-form">
									Tambah Produk Baru
								</button> -->

                <table class="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th>ID</th>
											<th>Bentuk</th>
                      <th>Kategori</th>
                      <th>Nama</th>
                      <th>Gambar</th>
                      <th>Editor</th>
                      <th>Terakhir Diedit</th>
                      <!-- <th>Tindakan</th> -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="product in products" :key="product.id">
                      <td>{{ product.id }}</td>
											<td>{{ product.shape }}</td>
											<td>{{ product.brandName }}</td>
                      <td>{{ product.productName }} - {{ product.variantName }}</td>
                      <td>
												<img :src="$store.state.apiUrl + 'custom_products/' + product.designFiles" class="img-fluid mb-2" :alt="product.designFiles"/>
											</td>
                      <td>{{ product.modifiedBy }}</td>
                      <td>{{ product.updatedAt }}</td>
                      <!-- <td>
                        <button type="button" @click="openEdit(product.id)" class="btn btn-primary" data-toggle="modal" data-target="#modal-edit-form">
                          <i class="fas fa-edit"></i>
                        </button>
                        <button type="button" @click="remove(product.id)" class="btn btn-danger">
                          <i class="fas fa-trash"></i>
                        </button>
                      </td> -->
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
	import CustomController from '@/controllers/CustomController.js'

	export default {
		name: 'ProductCustoms',
		data(){
			return{
				name				: null,
				shape 			: null,
				bestWidth 	: null,
				bestLength 	: null,
				tags 				: null,
				category 		: null,
				edit 				: null,
				attributes	: null,
				variant			: null,
				description	: null,
				designFiles	: null,
				products		: null,
				status 			: false,
				msg 				: null,
			}
		},

		async mounted() {
			this.products 	= (await CustomController.print()).data
		},

		methods: {
			
		}
	};
</script>