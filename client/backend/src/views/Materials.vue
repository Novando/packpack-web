<template>

	<div class="modal fade" id="modal-add">
		<div class="modal-dialog modal-lg">
			<form @submit.prevent="add" class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Pendaftaran Material Baru</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="form-group">
						<label for="name">Nama</label>
						<input type="text" class="form-control" id="name" v-model="name">
					</div>
					<div class="form-group">
						<label for="description">Deskripsi</label>
						<textarea rows="3" class="form-control" id="description" v-model="description"></textarea>
					</div>
					<div class="form-group">
						<label for="width">Ukuran</label>
						<div class="row">
							<div class="col-4">
								<input type="text" class="form-control" id="width" v-model="width">
							</div>mm
						</div>
					</div>
					<div class="form-group">
						<label for="weight">Berat</label>
						<div class="row">
							<div class="col-4">
								<input type="text" id="weight" class="form-control" v-model="weight">
							</div>kg/mm2
						</div>
					</div>
					<div class="form-group">
						<label for="price">Harga</label>
						<div class="row">
							<p class="col-1">
								Rp
							</p>
							<div class="col-2">
								<input type="text" class="form-control" id="price" v-model="price">
							</div>/mm2
						</div>
					</div>
					<div class="form-group">
						<label for="stock">Stok</label>
						<div class="row">
							<div class="col-4">
								<input type="text" class="form-control" id="stock" v-model="stock">
							</div>mm
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
		<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>

	<div v-if="edit" class="modal fade" id="modal-edit">
		<div class="modal-dialog modal-lg">
			<form @submit.prevent="editMaterial(edit.id)" class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Edit Material ID {{ edit.id }}</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="form-group">
						<label for="name">Nama</label>
						<input type="text" class="form-control" id="name" v-model="edit.name">
					</div>
					<div class="form-group">
						<label for="description">Deskripsi</label>
						<textarea rows="3" class="form-control" id="description" v-model="edit.description"></textarea>
					</div>
					<div class="form-group">
						<label for="width">Ukuran</label>
						<div class="row">
							<div class="col-4">
								<input type="text" class="form-control" id="width" v-model="edit.width">
							</div>mm
						</div>
					</div>
					<div class="form-group">
						<label for="weight">Berat</label>
						<div class="row">
							<div class="col-4">
								<input type="text" id="weight" class="form-control" v-model="edit.weight">
							</div>kg/mm2
						</div>
					</div>
					<div class="form-group">
						<label for="price">Harga</label>
						<div class="row">
							<p class="col-1">
								Rp
							</p>
							<div class="col-2">
								<input type="text" class="form-control" id="price" v-model="edit.price">
							</div>/mm2
						</div>
					</div>
				</div>
				<div class="modal-footer justify-content-between">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					<button type="submit" class="btn btn-primary">Submit</button>
				</div>
			</form>
		<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>

	<div v-if="edit" class="modal fade" id="modal-restock">
		<div class="modal-dialog modal-lg">
			<form @submit.prevent="restock(edit.id)" class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Restock Material {{ edit.name }} - {{ edit.width }}</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="form-group">
						<label for="stock">Penambahan stok</label>
						<div class="row">
							<div class="col-4">
								<input type="text" class="form-control" id="stock" v-model="stock">
							</div>mm
						</div>
					</div>
				</div>
				<div class="modal-footer justify-content-between">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					<button type="submit" class="btn btn-primary">Submit</button>
				</div>
			</form>
		<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>

	<div v-if="edit" class="modal fade" id="modal-adjust">
		<div class="modal-dialog modal-lg">
			<form @submit.prevent="adjust(edit.id)" class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Penyesuaian Stok Material {{ edit.name }} - {{ edit.width }}</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="form-group">
						<label for="stock">Stok saat ini :</label>
						<div class="row">
							<div class="col-4">
								<input type="text" class="form-control" id="stock" v-model="edit.stock">
							</div>mm
						</div>
					</div>
				</div>
				<div class="modal-footer justify-content-between">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					<button type="submit" class="btn btn-primary">Submit</button>
				</div>
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
								<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-add">
									Tambah Attribut Baru
								</button>

                <table class="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nama</th>
                      <th>Ukuran</th>
                      <th>Harga</th>
                      <th>Berat</th>
											<th>Stok</th>
                      <th>Editor</th>
                      <th>Terakhir Diedit</th>
											<th>Tindakan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="attribute in attributes" :key="attribute.id">
                      <td>{{ attribute.id }}</td>
                      <td>{{ attribute.name }}</td>
                      <td>{{ attribute.width }} mm</td>
                      <td>Rp {{ attribute.price }}/mm2</td>
                      <td>{{ attribute.weight }}kg/mm2</td>
                      <td>{{ attribute.stock }}mm</td>
											<td>{{ attribute.modifiedBy }}</td>
                      <td>{{ attribute.updatedAt }}</td>
											<td>
                        <button type="button" @click="openEdit(attribute.id)" class="btn btn-primary" data-toggle="modal" data-target="#modal-edit">
                          <i class="fas fa-edit"></i>
                        </button>
												<button type="button" @click="openEdit(attribute.id)" class="btn btn-primary" data-toggle="modal" data-target="#modal-restock">
                          <i class="fas fa-archive"></i>
                        </button>
												<button type="button" @click="openEdit(attribute.id)" class="btn btn-primary" data-toggle="modal" data-target="#modal-adjust">
                          <i class="fas fa-sliders-h"></i>
                        </button>
                        <button type="button" @click="remove(attribute.id)" class="btn btn-danger">
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
	import MaterialController from '@/controllers/MaterialController.js'

	export default {
		name: 'Materials',
		data(){
			return{
				name				: null,
				edit 				: null,
				stock				: null,
				width 			: null,
				weight 			: null,
				attributes	: null,
				price 			: null,
				status 			: false,
				msg 				: null
			}
		},

		async mounted() {
			this.attributes = (await MaterialController.print()).data
		},

		methods: {
			async remove(id){
        await MaterialController.remove(id)
        this.attributes = (await MaterialController.print()).data
      },

      async openEdit(id){
        this.edit = (await MaterialController.show(id)).data
      },

      async editMaterial(id){
        await MaterialController.edit(id, {
					id 					: this.edit.id,
					name				: this.edit.name,
					description	: this.edit.description,
					width 			: this.edit.width,
					price 			: this.edit.price,
					weight 			: this.edit.weight,
        })
				this.attributes = (await MaterialController.print()).data
      },

      async restock(id){
        await MaterialController.restock(id, {
					stock 		: this.stock,
        })
				this.attributes = (await MaterialController.print()).data
      },

      async adjust(id){
        await MaterialController.adjust(id, {
					stock 		: this.edit.stock,
        })
				this.attributes = (await MaterialController.print()).data
      },

			async add() {
				try {
          await MaterialController.add({
            name				: this.name,
						description	: this.description,
            width 			: this.width,
            price 			: this.price,
            weight 			: this.weight,
            stock				: this.stock,
          })
          this.status = true
					this.attributes = (await MaterialController.print()).data
        } catch(err) {
					this.status = false
          this.msg = 'Error: ' + err.response.data.msg
        }
      },
		}
	}
</script>