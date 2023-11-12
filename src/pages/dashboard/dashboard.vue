<template>
  <div>
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">{{ $t("labels.dashboard") }}</h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/admin/">{{ $t("labels.home") }}</router-link>
              </li>
              <li class="breadcrumb-item active">Dashboard</li>
            </ol>
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <!-- Small boxes (Stat box) -->
        <div class="row">
          <!-- ./col -->
          <!--     | User |      -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-warning">
              <div class="inner">
                <p class="text-white">Users</p>
              </div>
              <div class="icon mb-5">
                <i class="fa fa-user" aria-hidden="true"></i>
              </div>
              <router-link to="/admin/user" class="small-box-footer"
                >More info <i class="fas fa-arrow-circle-right"></i
              ></router-link>
            </div>
          </div>
          <!-- ./col -->
          <!--     | Group |      -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-info">
              <div class="inner">
                <p class="text-white">Group</p>
              </div>
              <div class="icon mb-5">
                <i class="fa fa-users" aria-hidden="true"></i>
              </div>
              <router-link to="/admin/group" class="small-box-footer"
                >More info <i class="fas fa-arrow-circle-right"></i
              ></router-link>
            </div>
          </div>
          <!-- ./col -->
          <!--     | Rating |      -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-success">
              <div class="inner">
                <p>Rating</p>
              </div>
              <div class="icon mb-5">
                <i class="ion ion-stats-bars"></i>
              </div>
              <router-link to="/admin/" class="small-box-footer"
                >More info <i class="fas fa-arrow-circle-right"></i
              ></router-link>
            </div>
          </div>
          <!-- ./col -->
          <!--     | All Statistics |      -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-danger">
              <div class="inner">
                <p>Statistics</p>
              </div>
              <div class="icon mb-5">
                <i class="ion ion-pie-graph"></i>
              </div>
              <router-link to="/" class="small-box-footer"
                >More info <i class="fas fa-arrow-circle-right"></i
              ></router-link>
            </div>
          </div>
          <!-- ./col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
</template>
<script src="./dashboard.ts" lang="ts"></script>
<style src="./dashboard.scss" lang="scss"></style>
