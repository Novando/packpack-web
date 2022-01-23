<template>
	<div class="modal fade" id="modal-lg">
		<div class="modal-dialog modal-lg">
			<form @submit.prevent="add" class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Buat Attribut Produk</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="form-group">
						<label for="bentuk">Bentuk</label>
						<input type="text" class="form-control" id="bentuk" v-model="shape">
					</div>
					<div class="form-group">
						<label for="material">Material</label>
						<input type="text" class="form-control" id="material" v-model="material">
					</div>
					<div class="form-group">
						<label for="length">Ukuran</label>
						<div class="row">
							<div class="col-3">
								<input type="text" class="form-control" id="length" placeholder="Panjang" v-model="length">
							</div>
							<div class="col-1 text-center">
								X
							</div>
							<div class="col-3">
								<input type="text" class="form-control" placeholder="Lebar" v-model="width">
							</div>
						</div>
					</div>
					<div class="form-group">
						<label for="weight">Berat</label>
						<input type="text" class="form-control" id="weight" v-model="weight">
					</div>
					<div class="form-group">
						<label for="weight">Harga per 1000 pcs</label>
						<input type="text" class="form-control" id="weight" v-model="x1000">
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
                <h3 class="card-title">Atribut Produk</h3>

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
								<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-lg">
									Tambah Attribut Baru
								</button>

                <table class="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Bentuk</th>
                      <th>Material</th>
                      <th>Ukuran</th>
                      <th>Berat</th>
                      <th>Editor</th>
                      <th>Terakhir Diedit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="attribute in attributes" :key="attribute.id">
                      <td>{{ attribute.id }}</td>
                      <td>{{ attribute.shape }}</td>
                      <td>{{ attribute.material }}</td>
                      <td>{{ attribute.length }}mm x {{ attribute.width }}mm</td>
                      <td>{{ attribute.weight }}kg</td>
                      <td>{{ attribute.modifiedBy }}</td>
                      <td>{{ attribute.updatedAt }}</td>
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
	import ProductAttributeController from '@/controllers/ProductAttributeController.js'

	export default {
		name: 'ProductAttributes',
		data(){
			return{
				shape				: null,
				material		: null,
				length			: null,
				width 			: null,
				weight 			: null,
				attributes	: null,
				status 			: false,
				msg 				: null
			}
		},

		async mounted() {
			this.attributes = (await ProductAttributeController.show()).data
		},

		methods: {
			async add() {
				try {
          await ProductAttributeController.add({
            shape			: this.shape,
            material	: this.material,
            length 		: this.length,
            width 		: this.width,
            weight 		: this.weight,
            x1000 		: this.x1000
          })
          this.status = true
        } catch(err) {
					this.status = false
          this.msg = 'Error: ' + err.response.data.msg
        }
      },
		}
	}
</script>