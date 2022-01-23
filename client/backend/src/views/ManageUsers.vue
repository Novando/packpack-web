<template>
  <div class="modal fade" id="modal-lg">
    <div class="modal-dialog modal-lg">
      <form v-if="edit" @submit.prevent="editUser(edit.id)" class="modal-content" enctype="multipart/form-data">
        <div class="modal-header">
          <h4 class="modal-title">Edit identitas {{ edit.username }}</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="email" disabled>Email</label>
            <input type="text" class="form-control" id="email" v-model="edit.email">
          </div>
          <div class="form-group">
            <label for="first_name">Nama Depan</label>
            <input type="text" class="form-control" id="first_name" v-model="edit.firstName">
          </div>
          <div class="form-group">
            <label for="last_name">Nama Belakang</label>
            <input type="text" class="form-control" id="last_name" v-model="edit.lastName">
          </div>
          <div class="form-group">
            <label for="role">Hak Akses</label>
            <select class="custom-select" v-model="edit.role">
              <option :value="edit.role" disabled selected hidden>{{edit.role}}</option>
              <option value="customer">Pelanggan</option>
              <option value="admin">Admin</option>
              <option value="superuser">Superuser</option>
            </select>
          </div>
          <div class="form-group">
            <label for="password">Passsword</label>
            <input type="password" class="form-control" id="password" v-model="edit.password">
          </div>
          <div class="form-group">
            <label for="confirm">Konfirmasi Passsword</label>
            <input type="password" class="form-control" id="confirm" v-model="edit.confirm">
          </div>
        </div>
        <div class="modal-footer justify-content-between">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
          <p v-if="!status">{{ msg }}</p>
          <p v-else>Atribut baru telah tersimpan</p>
      </form>
      <div v-else></div>
    <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
  <!-- /.modal -->
	<!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <!-- /.row -->
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Daftar Pengguna</h3>

                <div class="card-tools">
                  <div class="input-group input-group-sm" style="width: 150px;">
                    <input type="text" name="table_search" class="form-control float-right" placeholder="Search">

                    <div class="input-group-append">
                      <button type="submit" @click="remove" class="btn btn-default">
                        <i class="fas fa-search"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Terverifikasi?</th>
                      <th>Aktif?</th>
                      <th>Hak Akses</th>
                      <th>Last Login</th>
                      <th>IP</th>
                      <th>Tindakan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in users" :key="user.id">
                      <td>{{user.id}}</td>
                      <td>{{user.username}}</td>
                      <td>{{user.email}}</td>
                      <td>{{user.isVerified}}</td>
                      <td>{{user.isActive}}</td>
                      <td>{{user.role}}</td>
                      <td>{{user.updatedAt}}</td>
                      <td>{{user.modifiedBy}}</td>
                      <td>
                        <button type="button" @click="openEdit(user.id)" class="btn btn-primary" data-toggle="modal" data-target="#modal-lg">
                          <i class="fas fa-edit"></i>
                        </button>
                        <button type="button" @click="remove(user.id)" class="btn btn-danger">
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
  import UserController from '@/controllers/UserController.js'

	export default{
		name: 'ManageUsers',
    data(){
      return {
        users     : null,
        userId    : null,
        edit      : null,
        username  : '',
        email     : '',
        firstName : '',
        lastName  : '',
        role      : '',
      }
    },

    async mounted(){
      this.users = (await UserController.print()).data
    },

    methods:{
      async remove(id){
        await UserController.remove(id)
        this.users = (await UserController.print()).data
      },

      async openEdit(id){
        this.edit = (await UserController.show(id)).data
      },

      async editUser(id){
        if (this.edit.password == '' || this.edit.password == ' '){
           this.edit.password = null
        }
        await UserController.edit(id, {
          email: this.edit.email,
          role: this.edit.role,
          firstName: this.edit.firstName,
          lastName: this.edit.lastName,
          password: this.edit.password,
          confirm: this.edit.confirm,
        })

        this.edit.password = ''
        this.edit.confirm = ''
        this.users = (await UserController.print()).data
      },
    }
	}
</script>