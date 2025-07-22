<template>
  <div v-if="getLoader">
    <Loader></Loader>
  </div>
  <!-- Content wrapper -->
  <div class="content-wrapper">
    <!-- Content -->
    <div class="container-fluid flex-grow-1 container-p-y">
      <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
      <div class="row mt-4">
        <div class="col-12">
          <!-- <div class="card">
            <div class="card-header pb-2">
              <h5 class="card-title mb-1">Invite member</h5>
            </div>
            <div class="card-body">
              <form>
                <div class="row-mb">
                  <div class="form-group">
                    <label for="email" class="required">Email</label>
                    <input type="email" placeholder="Email" class="form-control" v-model="invaiteMember.email" />
                    <div   v-if="validationErrors && validationErrors.message" class="text-danger">
                      {{ validationErrors.message }}
                    </div>
                  </div>
                  <div class="form-group mt-3">
                    <label for="role_name" class="required">Role Name</label>
                    <select  v-model="invaiteMember.role_name" id="role_name" class="form-select">
                      <option value="">Select Role</option>
                      <option v-for="role in doppcallTeam.roles" :value="role.id" :key="role.id" >
                        {{ role.name }}
                      </option>
                    </select>
                    <div v-if="validationErrors && validationErrors.role_name" class="text-danger">
                      {{ validationErrors.role_name[0] }}
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-12 text-end mt-3">
                      <button type="button" class="btn btn-primary btn-sm" @click="invaiteMemberSave()">
                        <i class="fas fa-check fa-sm me-2"></i>
                        Invite
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div> -->
          <div class="card mt-4"  :class="showInvateSection == true ? '' : 'd-none'">
            <div class="card-header pt-3 pb-0">
              <h5 class="card-title ms-2">Invitations</h5>
            </div>
            <div class="card-body">
              <table class="align-middle mb-0 table table-hover" id="invitations_tables">
                <thead>
                  <tr>
                    <!-- <th></th> -->
                    <th></th>
                    <th>Email</th>
                    <th>Expires at</th>
                    <th>Status</th>
                    <th>Operation</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
          <div class="card mt-4">
            <div class="card-header pt-3 pb-0">
              <h5 class="card-title mb-0 ms-2">Manage Doppcall Team </h5>
            </div>
            <div class="card-body" >
              <table class="align-middle mb-0 table table-hover" id="super_admin_datatables">
                <thead>
                  <tr>
                    <!-- <th></th> -->
                     <th></th>
                      <th>Name</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Slug</th>
                      <th>Email</th>
                      <th>Role Name</th>
                      <th>Phone Number</th>
                      <th>Company</th>
                      <th>Company Website</th>
                      <th>Monthly Visitors</th>
                      <th>User Offers</th>
                      <th>Traffic Urls</th>
                      <th>Country Code</th>
                      <th>Browser</th>
                      <th>OS</th>
                      <th>Skype</th>
                      <th>Telegram</th>
                      <th>Facebook</th>
                      <th>Status</th>
                      <th>Email Verified</th>
                      <th>Created At</th>
                      <th width="190px" id="action-incompleted">Action</th> 
                  </tr>
                </thead>
                <tbody>

                </tbody>
              </table>
              <div id="externalFilters" v-if="showHiddenExternalFilter">
                <div>
                  <div class="row">
                    <div class="d-flex justify-content-between align-items-center border-bottom py-3 px-4">
                      <h5 class="mb-0">Apply Filter <template v-if="applyfillters.length > 0"><span class="badge bg-dark text-white">{{ applyfillters.length ?? 0 }}</span></template></h5>
                      <a class="clearallexternalfilter" @click="externalfilterreset()">Clear All</a>
                    </div>
                  </div>
                  <div class="row px-3" id="externalFiltersWrapper">
                    <div class="col-md-6 border-right">
                      <ul class="px-0 mt-3" id="offer-extra-filter">
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Name' ? 'check-active' : ''"
                            @click="clickFilters('name', 'search', 'Name')">Name 
                          </a>
                          <template v-if="applyfillters.includes('Name')">
                            <span @click="removeSearch('Name','name','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'First Name' ? 'check-active' : ''"
                            @click="clickFilters('fname', 'search', 'First Name')">First Name 
                          </a>
                          <template v-if="applyfillters.includes('First Name')">
                            <span @click="removeSearch('First Name','fname','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Last Name' ? 'check-active' : ''"
                            @click="clickFilters('lname', 'search', 'Last Name')">Last Name 
                          </a>
                          <template v-if="applyfillters.includes('Last Name')">
                            <span @click="removeSearch('Last Name','lname','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Slug' ? 'check-active' : ''"
                            @click="clickFilters('slug', 'search', 'Slug')">Slug 
                          </a>
                          <template v-if="applyfillters.includes('Slug')">
                            <span @click="removeSearch('Slug','slug','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Email' ? 'check-active' : ''"
                            @click="clickFilters('email', 'search', 'Email')">Email 
                          </a>
                          <template v-if="applyfillters.includes('Email')">
                            <span @click="removeSearch('Email','email','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Role' ? 'check-active' : ''"
                            @click="clickFilters('role_id', 'select', 'Role')">Role <i class="fa-solid fa-caret-down"></i>
                          </a>
                          <template v-if="applyfillters.includes('Role')">
                            <span @click="removeSearch('Role','role_id','select')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Phone Number' ? 'check-active' : ''"
                            @click="clickFilters('phone_no ', 'search', 'Phone Number')">Phone Number 
                          </a>
                          <template v-if="applyfillters.includes('Phone Number')">
                            <span @click="removeSearch('Phone Number','phone_no ','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Company Name' ? 'check-active' : ''"
                            @click="clickFilters('company_name ', 'search', 'Company Name')">Company Name 
                          </a>
                          <template v-if="applyfillters.includes('Company Name')">
                            <span @click="removeSearch('Company Name','company_name ','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Company Website' ? 'check-active' : ''"
                            @click="clickFilters('company_website', 'search', 'Company Website')">Company Website 
                          </a>
                          <template v-if="applyfillters.includes('Company Website')">
                            <span @click="removeSearch('Company Website','company_website','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Monthly Visitors' ? 'check-active' : ''"
                            @click="clickFilters('monthly_visitors', 'search', 'Monthly Visitors')">Monthly Visitors 
                          </a>
                          <template v-if="applyfillters.includes('Monthly Visitors')">
                            <span @click="removeSearch('Monthly Visitors','monthly_visitors','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'User Offers' ? 'check-active' : ''"
                            @click="clickFilters('user_offers', 'search', 'User Offers')">User Offers 
                          </a>
                          <template v-if="applyfillters.includes('User Offers')">
                            <span @click="removeSearch('User Offers','user_offers','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Traffic Urls' ? 'check-active' : ''"
                            @click="clickFilters('traffic_urls', 'search', 'Traffic Urls')">Traffic Urls 
                          </a>
                          <template v-if="applyfillters.includes('Traffic Urls')">
                            <span @click="removeSearch('Traffic Urls','traffic_urls','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Country Code' ? 'check-active' : ''"
                            @click="clickFilters('country_code', 'search', 'Country Code')">Country Code 
                          </a>
                          <template v-if="applyfillters.includes('Country Code')">
                            <span @click="removeSearch('Country Code','country_code','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Browser' ? 'check-active' : ''"
                            @click="clickFilters('browser', 'search', 'Browser')">Browser 
                          </a>
                          <template v-if="applyfillters.includes('Browser')">
                            <span @click="removeSearch('Browser','browser','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'OS' ? 'check-active' : ''"
                            @click="clickFilters('os', 'search', 'OS')">OS 
                          </a>
                          <template v-if="applyfillters.includes('OS')">
                            <span @click="removeSearch('OS','os','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Skype' ? 'check-active' : ''"
                            @click="clickFilters('skype', 'search', 'Skype')">Skype 
                          </a>
                          <template v-if="applyfillters.includes('Skype')">
                            <span @click="removeSearch('Skype','skype','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Telegram' ? 'check-active' : ''"
                            @click="clickFilters('telegram', 'search', 'Telegram')">Telegram 
                          </a>
                          <template v-if="applyfillters.includes('Telegram')">
                            <span @click="removeSearch('Telegram','telegram','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Facebook' ? 'check-active' : ''"
                            @click="clickFilters('facebook', 'search', 'Facebook')">Facebook 
                          </a>
                          <template v-if="applyfillters.includes('Facebook')">
                            <span @click="removeSearch('Facebook','facebook','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Status' ? 'check-active' : ''"
                            @click="clickFilters('account_access', 'select', 'Status')">Status <i class="fa-solid fa-caret-down"></i> 
                          </a>
                          <template v-if="applyfillters.includes('Status')">
                            <span @click="removeSearch('Status','account_access','select')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Verified' ? 'check-active' : ''"
                            @click="clickFilters('verified', 'select', 'Verified')">Verified <i class="fa-solid fa-caret-down"></i> 
                          </a>
                          <template v-if="applyfillters.includes('Verified')">
                            <span @click="removeSearch('Verified','verified','select')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Created At' ? 'check-active' : ''"
                            @click="clickFilters('created_at', 'search', 'Created At')">Created At 
                          </a>
                          <template v-if="applyfillters.includes('Created At')">
                            <span @click="removeSearch('Created At','created_at','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                      </ul>
                    </div>
                    <div class="col-md-6 ps-4">
                      <div v-if="checkfilter.showcolumn != null && checkfilter.showcolumn != ''">
                        <p class="mt-3 mb-1 font-class">{{ checkfilter.showcolumn ?? '' }}</p>
                        <template v-if="checkfilter.showcolumn == 'Name' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['name']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['name']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'First Name' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['fname']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['fname']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Last Name' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['lname']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['lname']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Slug' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['slug']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['slug']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Email' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['email']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['email']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Role' && checkfilter.types.includes('select')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['role_id']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['role_id']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Phone Number' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['phone_no']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['phone_no']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Company Name' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['company_name']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['company_name']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Company Website' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['company_website']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['company_website']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Monthly Visitors' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['monthly_visitors']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['monthly_visitors']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'User Offers' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['user_offers']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['user_offers']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Traffic Urls' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['traffic_urls']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['traffic_urls']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Country Code' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['country_code']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['country_code']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Browser' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['browser']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['browser']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'OS' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['os']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['os']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Skype' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['skype']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['skype']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Telegram' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['telegram']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['telegram']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Facebook' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['facebook']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['facebook']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Status' && checkfilter.types.includes('select')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['account_access']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['account_access']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Verified' && checkfilter.types.includes('select')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['Verified']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['Verified']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Created At' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['created_at']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['created_at']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <div>
                          <p>Have value</p>
                          <div>
                            <template v-if="checkfilter.showcolumn == 'Name' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['name']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'First Name' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['fname']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Last Name' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['lname']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Slug' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['slug']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Email' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['email']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Role' && checkfilter.types.includes('select')">
                            <template v-if="doppcallTeam?.allRoles?.length > 0">
                                <template v-for="(role,index) in doppcallTeam?.allRoles" :key="index">
                                  <div class="form-check mb-2">
                                    <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['role_id']" class="form-check-input" type="checkbox" :value="role.id" :id="'dynamicid'+role.id">
                                    <label class="form-check-label" :for="'dynamicid'+role.id">
                                      {{ role.secondary_name ?? '' }}
                                    </label>
                                  </div>
                                </template>
                              </template>
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Phone Number' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['phone_no']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Company Name' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['company_name']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Company Website' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['company_website']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Monthly Visitors' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['monthly_visitors']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'User Offers' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['user_offers']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Traffic Urls' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['traffic_urls']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Country Code' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['country_code']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Browser' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['browser']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'OS' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['os']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Skype' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['skype']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Telegram' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['telegram']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Facebook' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['country_code']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Status' && checkfilter.types.includes('select')">
                                  <div class="form-check mb-2">
                                    <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['account_access']" class="form-check-input" type="checkbox" value="0" id="dynamicidstatus0">
                                    <label class="form-check-label" for="dynamicidstatus0">
                                      Pending
                                    </label>
                                  </div>
                                  <div class="form-check mb-2">
                                    <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['account_access']" class="form-check-input" type="checkbox" value="1" id="dynamicidstatus1">
                                    <label class="form-check-label" for="dynamicidstatus1">
                                      Approved
                                    </label>
                                  </div>
                                  <div class="form-check mb-2">
                                    <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['account_access']" class="form-check-input" type="checkbox" value="2" id="dynamicidstatus2">
                                    <label class="form-check-label" for="dynamicidstatus2">
                                      Suspend
                                    </label>
                                  </div>
                                  <div class="form-check mb-2">
                                    <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['account_access']" class="form-check-input" type="checkbox" value="3" id="dynamicidstatus3">
                                    <label class="form-check-label" for="dynamicidstatus3">
                                      Unsuspend
                                    </label>
                                  </div>
                                  <div class="form-check mb-2">
                                    <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['account_access']" class="form-check-input" type="checkbox" value="4" id="dynamicidstatus4">
                                    <label class="form-check-label" for="dynamicidstatus4">
                                      Pause
                                    </label>
                                  </div>
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Verified' && checkfilter.types.includes('select')">
                                <div class="form-check mb-2">
                                  <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['verified']" class="form-check-input" type="checkbox" value="1" id="1">
                                  <label class="form-check-label" for="1">
                                    Verified
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['verified']" class="form-check-input" type="checkbox" value="2" id="2">
                                  <label class="form-check-label" for="2">
                                    Unverified
                                  </label>
                                </div>
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Created At' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['created_at']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="card mt-4">
            <div class="card-header pt-3 pb-0">
              <h5 class="card-title mb-0 ms-2">
                Account Managers
              </h5>
            </div>
            <div class="card-body px-4 table-responsive table-overflow-hidden">
              <table class="align-middle mb-0 table table-hover" id="account_manager_datatables">
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>

                </tbody>
              </table>
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <!-- / Content -->
  </div>

  <!-- Large Modal -->
  <div class="modal fade" id="singleDeleteModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="assignToManager3">Team Member Delete Note</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <label for="deletenote" class="required">Note</label>
              <textarea v-model="deleteUser.deleted_note" id="deletenote" class="form-control" placeholder="Enter Your Note" rows="5"></textarea>
              <div v-if="validationErrorsForNote && validationErrorsForNote.deleted_note" class="text-danger">
                {{ validationErrorsForNote.deleted_note[0] }}
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" @click="deleteTeamMemberWithNote()" class="btn btn-primary"><i class="fas fa-check fa-sm me-1"></i> Submit</button>
            </div>
          </div>
        </div>
  </div>

  <!-- Large Modal -->
  <div class="modal fade" id="bulkDeleteModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="assignToManager3">Team Member Delete Note</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <label for="deletenote" class="required">Note</label>
          <textarea v-model="bulkactionadminids.deleted_note" id="deletenote" class="form-control" placeholder="Enter Your Note" rows="5"></textarea>
          <div v-if="validationErrorsForNote && validationErrorsForNote.deleted_note" class="text-danger">
            {{ validationErrorsForNote.deleted_note[0] }}
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">
            Close
          </button>
          <button type="button" @click="bulkactionsubmission()" class="btn btn-primary"><i class="fas fa-check fa-sm me-1"></i> Submit</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="roleChangeModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel1">Manage Roles</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="card-body px-3">
              <form>
                <div class="row-mb">
                  <div class="form-group mt-3">
                    <label for="role_name" class="required">Role Name</label>
                    <select  v-model="changeUserRole.role_id" id="role_name" class="form-select">
                      <option value="">Select Role</option>
                      <option v-for="role in doppcallTeam.roles" :value="role.id" :key="role.id" >
                        {{ role.secondary_name }}
                      </option>
                    </select>
                    <div v-if="validationErrorsForChangeRole && validationErrorsForChangeRole.role_id" class="text-danger">
                      {{ validationErrorsForChangeRole.role_id[0] }}
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-12 text-end my-3">
                      <button type="button" class="btn btn-primary btn-sm" @click="userRoleChange()">
                        <i class="fas fa-check fa-sm me-2"></i>
                        Change Role
                      </button>
                    </div>
                  </div>
                </div>
              </form>
          </div>
        </div>
      </div>
  </div>

  <div class="modal fade" id="inviteMemberModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel1">Invite Member</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="card-body px-3">
              <form>
                <div class="row-mb">
                  <div class="form-group">
                    <label for="email" class="required">Email</label>
                    <input type="email" placeholder="Email" class="form-control" v-model="invaiteMember.email" />
                    <div  v-if="validationErrors && validationErrors.message" class="text-danger">
                      {{ validationErrors.message }}
                    </div>
                  </div>
                  <div class="form-group mt-3">
                    <label for="role_name" class="required">Role Name</label>
                    <select  v-model="invaiteMember.role_name" id="role_name" class="form-select">
                      <option value="">Select Role</option>
                      <option v-for="role in doppcallTeam.roles" :value="role.id" :key="role.id" >
                        {{ role.secondary_name }}
                      </option>
                    </select>
                    <div v-if="validationErrors && validationErrors.role_name" class="text-danger">
                      {{ validationErrors.role_name[0] }}
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-12 text-end my-3">
                      <button type="button" class="btn btn-primary btn-sm" @click="invaiteMemberSave()">
                        <i class="fas fa-check fa-sm me-2"></i>
                        Invite
                      </button>
                    </div>
                  </div>
                </div>
              </form>
          </div>
        </div>
      </div>
  </div>
  <div class="modal fade" id="permissionModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel1">{{ modalTitle ?? 'Permission Create' }}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body py-0">
              <div class="row mt-3">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" v-model="allChecked" @change="toggleAll">
                        <label class="form-check-label">
                          All Check
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-check">
                        <input class="form-check-input" v-model="selectedValues"  type="checkbox" value="1" id="blogcreate">
                        <label class="form-check-label" for="blogcreate">
                          Blog Create
                        </label>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-check">
                        <input class="form-check-input" v-model="selectedValues" type="checkbox" value="2" id="pagecreate">
                        <label class="form-check-label" for="pagecreate">
                          Page Create
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button @click="createPermisstion()" type="button" class="btn btn-primary">
              Permission
            </button>
          </div>
        </div>
      </div>
  </div>
  <!-- Content wrapper -->
</template>

<script>
import axios from "axios";
import toastr from "toastr";
import Swal from "sweetalert2";
import "toastr/build/toastr.min.css";
import Loader from "../../../../../include/loader.vue";
import Breadcrumb from "../../../../../include/breadcrumb.vue";
import { inject } from "vue";
import moment from "moment";
import { fetchUserRole } from "@/services/userService";

export default {
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
  props: ["doppcallTeam"],
  components: {
    Loader,
    Breadcrumb,
  },
  data() {
    return {
      invaiteMember: {
        email: "",
        role_name: "",
        invited_id : "",
      },
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Super Admin ", url: "" },
      ],
      getLoader: false,
      validationErrors: null,
      validationErrorsForChangeRole: null,
      validationErrorsForNote : null,
      deleteUser:{
        user_id : '',
        deleted_note: ''
      },
      changeStatus:{
        data : "",
        action_type : "",
      },
      selectedValues: [], 
      allChecked: false, 
      showInvateSection: false, 
      checkBoxOptions: ["1", "2"],
      modalTitle : 'Permission Create',
      createUserPermission : {
        user_id : '',
        permisstion : [],
      },
      changeUserRole : {
        user_id : '',
        role_id : '',
      },
      bulkactionids : {
        selectedIds: [],
      },
      bulkactionadminids : {
        selectedIds: [],
        deleted_note : "",
      },
      showHiddenExternalFilter: false,
      checkfilter: {
        columns: ['name'],
        showcolumn: "Name",
        types : ['search'],
        emptyValues : {
          name : [],
          fname : [],
          lname : [],
          slug : [],
          email : [],
          role_id : [],
          phone_no : [],
          company_name : [],
          company_website : [],
          monthly_visitors : [],
          user_offers : [],
          traffic_urls : [],
          country_code : [],
          browser : [],
          os : [],
          skype : [],
          telegram : [],
          facebook : [],
          account_access : [],
          verified : [],
          created_at : [],
        },
        notemptyValues : {
          name : [],
          fname : [],
          lname : [],
          slug : [],
          email : [],
          role_id : [],
          phone_no : [],
          company_name : [],
          company_website : [],
          monthly_visitors : [],
          user_offers : [],
          traffic_urls : [],
          country_code : [],
          browser : [],
          os : [],
          skype : [],
          telegram : [],
          facebook : [],
          account_access : [],
          verified : [],
          created_at : [],
        },
        searchValues : {
          name : [],
          fname : [],
          lname : [],
          slug : [],
          email : [],
          phone_no : [],
          company_name : [],
          company_website : [],
          monthly_visitors : [],
          user_offers : [],
          traffic_urls : [],
          country_code : [],
          browser : [],
          os : [],
          skype : [],
          telegram : [],
          facebook : [],
          created_at : [],
        },
        selectedValues: {
          role_id : [],
          account_access : [],
          verified : [],
        },
      },
      applyfillters : [],
    };
  },
  watch: {
    selectedValues(newValues) {
      this.allChecked = newValues.length === this.checkBoxOptions.length;
    }
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRole();
      if (role == 'Super' || role == 'Admin') {
        this.getInvitations();
        this.getDoppcallTeams();
        this.getUserData();
        this.$nextTick(() => {
          const dataTableWrapper = document.querySelectorAll('#invitations_tables_wrapper .row.mx-2');
          if (dataTableWrapper.length > 0) {
            dataTableWrapper[0].style.display = 'none';
            dataTableWrapper[1].style.display = 'none';
          }
        });
        this.$nextTick(() => {
          const dataTableWrapper = document.querySelectorAll('#super_admin_datatables_wrapper .row.mx-2');
          if (dataTableWrapper.length > 0) {
            dataTableWrapper[0].style.display = 'none';
            dataTableWrapper[1].style.display = 'none';
          }
        });
        this.$nextTick(() => {
          const dataTableWrapper = document.querySelectorAll('#account_manager_datatables_wrapper .row.mx-2');
          if (dataTableWrapper.length > 0) {
            dataTableWrapper[0].style.display = 'none';
            dataTableWrapper[1].style.display = 'none';
          }
        });
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
    document.addEventListener('click', (e) => {
      const target = e.target.closest('a[data-vue-route]');
      if (target) {
        e.preventDefault();
        const route = target.getAttribute('href');
        this.$router.push(route);
      }
    }, true);
  },
  methods: {
    getUserData() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl + "auth/user/data", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.invaiteMember.invited_id =  res.data.data.id;
        })
        .catch((error) => {
          return error;
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    invaiteMemberSave() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl+"admin/invite-member/store",
          this.invaiteMember,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          toastr.success(res.data.message);
          this.invaiteMember.email = "";
          this.invaiteMember.role_name = "";
          this.getInvitations();
          this.callAllInvitationNext();
          const modal = document.getElementById("inviteMemberModal");
          const bootstrapModal = bootstrap.Modal.getInstance(modal);
          if (bootstrapModal) {
            bootstrapModal.hide();
          }
        })
        .catch((error) => {
          if (error && error.response && error.response.data) {
            this.validationErrors = error.response.data;
          }
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    getInvitations() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl+"admin/manage/doppcall-team", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if ($.fn.DataTable.isDataTable("#invitations_tables")) {
          $('#invitations_tables').DataTable().destroy();
        }
        if(res?.data?.invitations?.length > 0){
          this.showInvateSection = true;
        }else{
          this.showInvateSection = false;
        }
        var formateDate = this.formatDates;
        var table = $('#invitations_tables').DataTable({
          data: res.data.invitations,
          columns: [
            // { data: 'id' },
            { data: null },
            { data: 'email' },
            // { data: 'expires_at' },
            {
              data: "expires_at",
              render: function (data, type, row) {
                return formateDate(row.expires_at);
              },
            },
            {
              data: "status",
              render: function (data, type, row) {
                return `<span class="badge bg-danger">${row.status}</span>`;;
              },
            },
            {
              data: "id",
              render: function (data, type, row) {
                return (
                  '<button type="button" title="Delete" data-id=' +
                  row.id +
                  ' class="invaite-delete-btn border-0 rounded-circle bg-transparent border-0 text-danger"><i  data-id="' +
                  row.id +
                  ' " class="far fa-trash-alt fa-sm"></i></button>'
                );
              },
            },
          ],
          initComplete: () => { 
            this.attachEventListeners();
            this.attachEventListenersBlulkAction();
            this.attachEventListenersBlulkActionSubmit();
          },
          createdRow: function (row, data, dataIndex) {
              $("td:eq(0)", row).html(dataIndex + 1);
            },
          columnDefs: [
            {
              targets: 0,
              orderable: false,
              checkboxes: {
                selectAllRender: '<input type="checkbox" class="form-check-input ms-1">',
              },
              render: function (data, type, row) {
                return `<input type="checkbox" class="dt-checkboxes form-check-input ms-1 row-checkbox" data-id="${row.id}">`;
              },
              searchable: false
            },
          ],
          order: [[2, 'desc']],
          dom: '<"row mx-2"' +
            '<"col-md-4 px-0"f>' + 
            '<"col-md-8 dopp_tb d-flex justify-content-end align-items-center"l<"button-wrapper"B>>' + 
            '<"col-md-3 d-none"p>>' +
            't' + 
            '<"row mx-2"' +
            '<"col-md-5"i>' + 
            '<"col-md-7"p>>', 
          displayLength: 10, 
          lengthMenu: [10, 20, 50, 100, 200], 
          language: {
            sLengthMenu: '_MENU_',
            search: '', 
            searchPlaceholder: 'Search Invitations',
            paginate: { 
              previous: '<i class="fa-solid fa-chevron-left"></i>',
              next: '<i class="fa-solid fa-chevron-right"></i>'
            }
          },
          buttons: [
            {
                text: `
                  <div id="bulk-action-wrapper">
                    <select id="bulk-action-select" class="form-select form-select-sm">
                      <option value=""> ✓ Bulk Actions</option>
                      <option value="delete">Bulk Delete</option>
                    </select>
                  </div>
                `,
                className: "me-2 p-0 btn-primary d-none",
                attr: { id: "bulk-action-container" },
              },
              {
                extend: "collection",
                className: "btn btn-label-primary dropdown-toggle me-3",
                text: '<i class="ti ti-screen-share me-1 ti-xs"></i>Export',
                buttons: [
                  {
                    extend: "print",
                    text: '<i class="ti ti-printer me-1 ti-xs text-primary"></i>Print',
                    className: "dropdown-item",
                    exportOptions: { columns: [1, 2, 3] },
                  },
                  {
                    extend: "csv",
                    text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                    className: "dropdown-item",
                    exportOptions: { columns: [1, 2, 3] },
                  },
                  {
                    extend: "excel",
                    text:
                      '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                    className: "dropdown-item",
                    exportOptions: { columns: [1, 2, 3] },
                  },
                  {
                    extend: "pdf",
                    text:
                      '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                    className: "dropdown-item",
                    exportOptions: { columns: [1, 2, 3] },
                  },
                  {
                    extend: "copy",
                    text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                    className: "dropdown-item",
                    exportOptions: { columns: [1, 2, 3] },
                  },
                ],
              },
          ],
        });
        this.getLoader = false;
        })
        .catch((e) => {
          return e;
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    attachEventListenersBlulkAction() {
      $('#invitations_tables').on('change', '.row-checkbox', (event) => {
        const id = parseInt(event.target.dataset.id);

        if (event.target.checked) {
          if (!this.bulkactionids.selectedIds.includes(id)) {
            this.bulkactionids.selectedIds.push(id);
          }
        } else {
          this.bulkactionids.selectedIds = this.bulkactionids.selectedIds.filter(item => item !== id);
        }

        this.toggleBulkActionVisibility();
      });
      $('#invitations_tables thead').on('change', 'input[type="checkbox"]', (event) => {
        const isChecked = event.target.checked;
        $('#invitations_tables tbody .row-checkbox').each((index, checkbox) => {
          checkbox.checked = isChecked;
          const id = parseInt(checkbox.dataset.id);

          if (isChecked) {
            if (!this.bulkactionids.selectedIds.includes(id)) {
              this.bulkactionids.selectedIds.push(id);
            }
          } else {
            this.bulkactionids.selectedIds = [];
          }
        });

        this.toggleBulkActionVisibility();
      });
    },

    attachEventListenersBlulkActionSubmit() {
      $('#bulk-action-select').off().on('change', (e) => {
        const action = e.target.value;
        if (!action || this.bulkactionids.selectedIds.length === 0) {
          return;
        }
        if (action === 'delete') {
          this.bulkDelete();
        }
        $('#bulk-action-select').val('');
      });
    },

    toggleBulkActionVisibility() {
      const bulkActionWrapper = $('#bulk-action-container');
      if (this.bulkactionids.selectedIds.length > 0) {
        bulkActionWrapper?.removeClass('d-none');
      } else {
        bulkActionWrapper?.addClass('d-none');
      }
    },


    bulkDelete() {
      Swal.fire({
        text: 'Are Sure Delete',
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.value) {
          (this.getLoader = true),
            axios
              .post(
                this.globalVariables.apiUrl + "admin/manage/doppcall-team/bulk/delete",
                this.bulkactionids,
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              )
              .then((res) => {
                if (res.data.status == "success") {
                  toastr.success(res.data.message);
                  this.getInvitations();
                } else {
                  toastr.error(res.data.message);
                }
              })
              .catch((e) => {
                return e;
              })
              .finally(() => {
                this.getLoader = false;
              });
        }
      });
    },

    formatDates(date) {
      return moment(date).format('D MMMM YYYY');
    },

    attachEventListeners() {
      $("#invitations_tables").on("click", ".invaite-delete-btn", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        Swal.fire({
          text: "Are you sure delete",
          icon: "info",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.value) {
            (this.getLoader = true),
              axios
                .delete(
                  this.globalVariables.apiUrl+"admin/invitations/delete/"+dataId,{
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  }
                )
                .then((res) => {
                  toastr.success(res.data.message);
                  this.getInvitations();
                })
                .catch((e) => {
                  return e;
                })
                .finally(() => {
                  this.getLoader = false;
                });
          }
        });
      });
    },

    callAllInvitationNext(){
      this.$nextTick(() => {
      const dataTableWrapper = document.querySelectorAll('#invitations_tables_wrapper .row.mx-2');
      if (dataTableWrapper.length > 0) {
        dataTableWrapper[0].style.display = 'none';
        dataTableWrapper[1].style.display = 'none';
      }
    });
    },

    callAllNext(){
    this.$nextTick(() => {
      const dataTableWrapper = document.querySelectorAll('#super_admin_datatables_wrapper .row.mx-2');
      if (dataTableWrapper.length > 0) {
        dataTableWrapper[0].style.display = 'none';
        dataTableWrapper[1].style.display = 'none';
      }
    });
    this.$nextTick(() => {
      const dataTableWrapper = document.querySelectorAll('#account_manager_datatables_wrapper .row.mx-2');
      if (dataTableWrapper.length > 0) {
        dataTableWrapper[0].style.display = 'none';
        dataTableWrapper[1].style.display = 'none';
      }
    });
    },

    getDoppcallTeams() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl+"admin/manage/super-admin/get-data", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if ($.fn.DataTable.isDataTable("#super_admin_datatables")) {
            $('#super_admin_datatables').DataTable().destroy();
          }
          var formateDate = this.formatDates;
          var table = $('#super_admin_datatables').DataTable({
            data: res.data,
            columns: [
              // { data: 'id' },
              { data: 'id'},
              { data: "name",
                render: function (data, type, full, meta) {
                  if(full?.name != null && full?.name != ''){
                    return '<span title="'+full?.name+'">'+full?.name+'</span>';
                  }else{
                    return '----';
                  }
                }
              },
              { data: "fname",
                render: function (data, type, full, meta) {
                  if(full?.fname != null && full?.fname != ''){
                    return '<span title="'+full?.fname+'">'+full?.fname+'</span>';
                  }else{
                    return '----';
                  }
                }
              },
              { data: "lname",
                render: function (data, type, full, meta) {
                  if(full?.lname != null && full?.lname != ''){
                    return '<span title="'+full?.lname+'">'+full?.lname+'</span>';
                  }else{
                    return '----';
                  }
                }
              },
              { data: "slug",
                render: function (data, type, full, meta) {
                  if(full?.slug != null && full?.slug != ''){
                    return '<span title="'+full?.slug+'">'+full?.slug+'</span>';
                  }else{
                    return '----';
                  }
                }
              },
              { data: "email",
                render: function (data, type, full, meta) {
                  if(full?.email != null && full?.email != ''){
                    return '<span title="'+full?.email+'">'+full?.email+'</span>';
                  }else{
                    return '----';
                  }
                }
              },
              {
                data: "secondary_name",
                render: function (data, type, row) {
                  return `<span title="${row?.role?.secondary_name}" class="badge bg-success">${row?.role?.secondary_name}</span>`;
                },
              },
              {
                data: "phone_no",
                render: function (data, type, row) {
                  if (row.phone_no != null && row?.phone_no != '') {
                    return '<span title="'+row?.phone_no+'">'+row?.phone_no+'</span>';
                  }
                  return "--------";
                },
              },
              {
                data: "company_name",
                render: function (data, type, row) {
                  if (row.company_name != null && row?.company_name != '') {
                    return '<span title="'+row?.company_name+'">'+row?.company_name+'</span>';
                  }
                  return "--------";
                },
              },
              {
                data: "company_website",
                render: function (data, type, row) {
                  if (row.company_website != null && row?.company_website != '') {
                    return '<span title="'+row?.company_website+'">'+row?.company_website+'</span>';
                  }
                  return "--------";
                },
              },
              {
                data: "monthly_visitors",
                render: function (data, type, row) {
                  if (row.monthly_visitors != null && row?.monthly_visitors != '') {
                    return '<span title="'+row?.monthly_visitors+'">'+row?.monthly_visitors+'</span>';
                  }
                  return "--------";
                },
              },
              {
                data: "user_offers",
                render: function (data, type, row) {
                  if (row.user_offers != null && row?.user_offers != '') {
                    return '<span title="'+row?.user_offers+'">'+row?.user_offers+'</span>';
                  }
                  return "--------";
                },
              },
              {
                data: "traffic_urls",
                render: function (data, type, row) {
                  if (row.traffic_urls != null && row?.traffic_urls != '') {
                    return '<span title="'+row?.traffic_urls+'">'+row?.traffic_urls+'</span>';
                  }
                  return "--------";
                },
              },
              {
                data: "country_code",
                render: function (data, type, row) {
                  if (row.country_code != null && row?.country_code != '') {
                    return '<span title="'+row?.country_code+'">'+row?.country_code+'</span>';
                  }
                  return "--------";
                },
              },
              {
                data: "browser",
                render: function (data, type, row) {
                  if (row.browser != null && row?.browser != '') {
                    return '<span title="'+row?.browser+'">'+row?.browser+'</span>';
                  }
                  return "--------";
                },
              },
              {
                data: "os",
                render: function (data, type, row) {
                  if (row.os != null && row?.os != '') {
                    return '<span title="'+row?.os+'">'+row?.os+'</span>';
                  }
                  return "--------";
                },
              },
              {
                data: "skype",
                render: function (data, type, row) {
                  if (row.skype != null && row?.skype != '') {
                    return '<span title="'+row?.skype+'">'+row?.skype+'</span>';
                  }
                  return "--------";
                },
              },
              {
                data: "telegram",
                render: function (data, type, row) {
                  if (row.telegram != null && row?.telegram != '') {
                    return '<span title="'+row?.telegram+'">'+row?.telegram+'</span>';
                  }
                  return "--------";
                },
              },
              {
                data: "facebook",
                render: function (data, type, row) {
                  if (row.facebook != null && row?.facebook != '') {
                    return '<span title="'+row?.facebook+'">'+row?.facebook+'</span>';
                  }
                  return "--------";
                },
              },
              { data: "is_email_verified",
                  render: function (data, type, row) {
                    if (row?.is_email_verified != null) {
                      return '<span title="Verified" class="badge bg-success">Verified</span>';
                    }else {
                      return '<span title="Unverified" class="badge bg-danger">Unverified</span>';
                    }
                  },
                },
              { data: "convart_status" },
              {
                data: "created_at",
                render: function (data, type, row) {
                  if (row.created_at != null) {
                    return formateDate(row.created_at);
                  }
                  return "--------";
                },
              },
              { data: "convart_action" },
            ],
            initComplete: () => { 
              $('#super_admin_datatables').wrap('<div class="commonDataTablesClass"></div>');
              const table = $("#super_admin_datatables").DataTable();
                  const dropdownItems = document.querySelectorAll('.dropdown-menu .dropdown-item');

                  dropdownItems.forEach((item) => {
                    const columnAttr = item.getAttribute("data-column"); 
                    if (columnAttr === "all") {
                      item.addEventListener("click", function (e) {
                        e.preventDefault();
                        table.columns().visible(true);
                        dropdownItems.forEach((el) => {
                          if (el.getAttribute("data-column") !== "all") {
                            el.classList.add("active");
                          }
                        });
                      });
                    } else {
                      const columnIndex = parseInt(columnAttr);
                      const column = table.column(columnIndex);
                      if (column.visible()) {
                        item.classList.add("active");
                      }

                      item.addEventListener("click", function (e) {
                        e.preventDefault();

                        const currentVisible = column.visible();
                        column.visible(!currentVisible);

                        if (!currentVisible) {
                          item.classList.add("active");
                        } else {
                          item.classList.remove("active");
                        }
                      });
                    }
                  });
                  $('.select-colunm-position').on('click', function (e) {
                    e.stopPropagation();
                  });

                  $('.select-colunm-position .dropdown-item').on('click', function (e) {
                    e.stopPropagation();
                  });
              this.attachEventDoppCallTeam();
              this.attachEventListenersOfButton();
              this.attachEventListenersDoppCallTeamBlulkAction();
              this.attachEventListenersDoppCallTeamBlulkActionSubmit();
            },
            createdRow: function (row, data, dataIndex) {
                $("td:eq(0)", row).html(dataIndex + 1);
              },
            columnDefs: [
              {
                targets: 0,
                orderable: false,
                checkboxes: {
                  selectAllRender: '<input type="checkbox" class="form-check-input ms-1">',
                },
                render: function (data, type, row) {
                  return `<input type="checkbox" class="dt-checkboxes form-check-input ms-1 row-checkbox" data-id="${row.id}">`;
                },
                searchable: false
              },
              {
                targets: 4, 
                visible: false,
              },
              {
                targets: 8, 
                visible: false,
              },
              {
                targets: 9, 
                visible: false,
              },
              {
                targets: 10, 
                visible: false,
              },
              {
                targets: 11, 
                visible: false,
              },
              {
                targets: 12, 
                visible: false,
              },
              {
                targets: 13, 
                visible: false,
              },
              {
                targets: 14, 
                visible: false,
              },
              {
                targets: 15, 
                visible: false,
              },
              {
                targets: 16, 
                visible: false,
              },
              {
                targets: 17, 
                visible: false,
              },
              {
                targets: 18, 
                visible: false,
              },
              {
                targets: 20, 
                visible: false,
              },
            ],
            order: [[2, 'desc']],
            dom: '<"row mx-2"' +
              '<"col-md-4 px-0"f>' + 
              '<"col-md-8 dopp_tb d-flex justify-content-end align-items-center"l<"button-wrapper"B>>' + 
              '<"col-md-3 d-none"p>>' +
              't' + 
              '<"row mx-2"' +
              '<"col-md-5"i>' + 
              '<"col-md-7"p>>', 
            displayLength: 10, 
            lengthMenu: [10, 20, 50, 100, 200], 
            language: {
              sLengthMenu: '_MENU_',
              search: '', 
              searchPlaceholder: 'Search Manage Doppcall Team',
              paginate: { 
                previous: '<i class="fa-solid fa-chevron-left"></i>',
                next: '<i class="fa-solid fa-chevron-right"></i>'
              }
            },
            buttons: [
                {
                  text: `
                    <div id="bulk-action-wrapper">
                      <select id="bulk-action-select-second" class="form-select form-select-sm">
                        <option value=""> ✓ Bulk Actions</option>
                        <option value="delete">Bulk Delete</option>
                        <option value="0">Bulk Pending</option>
                        <option value="1">Bulk Approved</option>
                        <option value="2">Bulk Suspend</option>
                        <option value="3">Bulk Unsuspend</option>
                        <option value="4">Bulk Pause</option>
                        <option value="5">Bulk Resume</option>
                      </select>
                    </div>
                  `,
                  className: "me-2 p-0 btn-primary d-none",
                  attr: { id: "bulk-action-container-second" },
                },
                {
                  extend: "collection",
                  className: "btn btn-label-primary dropdown-toggle me-3",
                  text: '<i class="ti ti-screen-share me-1 ti-xs"></i>Export',
                  buttons: [
                    {
                      extend: "print",
                      text: '<i class="ti ti-printer me-1 ti-xs text-primary"></i>Print',
                      className: "dropdown-item",
                      exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
                    },
                    {
                      extend: "csv",
                      text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                      className: "dropdown-item",
                      exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
                    },
                    {
                      extend: "excel",
                      text:
                        '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                      className: "dropdown-item",
                      exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
                    },
                    {
                      extend: "pdf",
                      text:
                        '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                      className: "dropdown-item",
                      exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
                    },
                    {
                      extend: "copy",
                      text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                      className: "dropdown-item",
                      exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
                    },
                  ],
                },
                {
                  text:
                    '<span><i class="ti ti-plus me-1 ti-xs"></i>Add Invite Member</span>',
                  className: "btn btn-primary me-2",
                  action: function () {
                    const modalElement = document.getElementById("inviteMemberModal");
                    const modalInstance = new bootstrap.Modal(modalElement);
                    modalInstance.show();
                  },
                },
                {
                className: "btn btn-primary me-2",
                text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">Name</a></li><li><a class="dropdown-item" href="#" data-column="2">First Name</a></li><li><a class="dropdown-item" href="#" data-column="3">Last Name</a></li><li><a class="dropdown-item" href="#" data-column="4">Slug</a></li><li><a class="dropdown-item" href="#" data-column="5">Email</a></li><li><a class="dropdown-item" href="#" data-column="6">Role</a></li><li><a class="dropdown-item" href="#" data-column="7">Phone</a></li><li><a class="dropdown-item" href="#" data-column="8">Company</a></li><li><a class="dropdown-item" href="#" data-column="9">Company Website</a></li><li><a class="dropdown-item" href="#" data-column="10">Monthly Visitors</a></li><li><a class="dropdown-item" href="#" data-column="11">User Offers</a></li><li><a class="dropdown-item" href="#" data-column="12">Traffic Urls</a></li><li><a class="dropdown-item" href="#" data-column="13">Country Code</a></li><li><a class="dropdown-item" href="#" data-column="14">Browser</a></li><li><a class="dropdown-item" href="#" data-column="15">OS</a></li><li><a class="dropdown-item" href="#" data-column="16">Skype</a></li><li><a class="dropdown-item" href="#" data-column="17">Telegram</a></li><li><a class="dropdown-item" href="#" data-column="18">Facebook</a></li><li><a class="dropdown-item" href="#" data-column="19">Status</a></li><li><a class="dropdown-item" href="#" data-column="20">Email Verified</a></li><li><a class="dropdown-item" href="#" data-column="21">Created At</a></li><li><a class="dropdown-item" href="#" data-column="22">Action</a></li></div></ul></div>',
              },
                  {
                text:
                  '<span id="all_filters" class="all_filters"><i class="fa-solid fa-magnifying-glass me-1"></i>All Filters</span>',
                className: "btn btn-primary",
                attr: { id: "all_filters"},
              },
            ],
          });
        this.getLoader = false;
        })
        .catch((e) => {
          return e;
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    attachEventListenersOfButton() {
      $("#super_admin_datatables_wrapper").on("click", "button", (event) => {
        const target = $(event.target);
        const dataClass = target.attr("id");
        if(dataClass == 'all_filters'){
          this.showHiddenExternalFilter = !this.showHiddenExternalFilter;
        } 
      });
    },

    externalfilterreset(){
      this.checkfilter.columns = ['name'],
      this.checkfilter.showcolumn = "Name",
      this.checkfilter.types = ['search'],
      this.checkfilter.emptyValues = {
          name : [],
          fname : [],
          lname : [],
          slug : [],
          email : [],
          role_id : [],
          phone_no : [],
          company_name : [],
          company_website : [],
          monthly_visitors : [],
          user_offers : [],
          traffic_urls : [],
          country_code : [],
          browser : [],
          os : [],
          skype : [],
          telegram : [],
          facebook : [],
          account_access : [],
          verified : [],
          created_at : [],
      },
      this.checkfilter.notemptyValues = {
          name : [],
          fname : [],
          lname : [],
          slug : [],
          email : [],
          role_id : [],
          phone_no : [],
          company_name : [],
          company_website : [],
          monthly_visitors : [],
          user_offers : [],
          traffic_urls : [],
          country_code : [],
          browser : [],
          os : [],
          skype : [],
          telegram : [],
          facebook : [],
          account_access : [],
          verified : [],
          created_at : [],
      },
      this.checkfilter.searchValues = {
          name : [],
          fname : [],
          lname : [],
          slug : [],
          email : [],
          phone_no : [],
          company_name : [],
          company_website : [],
          monthly_visitors : [],
          user_offers : [],
          traffic_urls : [],
          country_code : [],
          browser : [],
          os : [],
          skype : [],
          telegram : [],
          facebook : [],
          created_at : [],
      },
      this.checkfilter.selectedValues = {
          role_id : [],
          account_access : [],
          verified : [],
      },
      this.checkfilter.applyfillters = [],
      this.showHiddenExternalFilter = !this.showHiddenExternalFilter;
      this.clickCheckboxFilters();
    },
        
    clickFilters(value,type, key) {
          if (!Array.isArray(this.checkfilter.columns)) {
            this.checkfilter.columns = [];
          }
          if (!this.checkfilter.columns.includes(value)) {
              this.checkfilter.columns.push(value);
          }
          this.checkfilter.types.push(type);
          this.checkfilter.showcolumn = key;
          this.getFiltarOfExtranalFilter();
    },
    
    clickCheckboxFilters(value) {
          if (!Array.isArray(this.applyfillters)) {
            this.applyfillters = [];
          }
          if (value !== null && value !== undefined && !this.applyfillters.includes(value)) {
            this.applyfillters.push(value);
          }
          this.getFiltarOfExtranalFilter();
    },
    
    removeSearch(value, key, type) {
          if (!Array.isArray(this.applyfillters)) {
            this.applyfillters = [];
          }
          const index = this.applyfillters.indexOf(value);
          if (index > -1) {
            this.applyfillters.splice(index, 1);
            if (this.checkfilter.emptyValues.hasOwnProperty(key)) {
              this.checkfilter.emptyValues[key] = [];
            }
    
            if (this.checkfilter.notemptyValues.hasOwnProperty(key)) {
              this.checkfilter.notemptyValues[key] = [];
            }
    
            if (type == 'select') {
              if (this.checkfilter.selectedValues.hasOwnProperty(key)) {
                this.checkfilter.selectedValues[key] = [];
              }
            } else {
              if (this.checkfilter.searchValues.hasOwnProperty(key)) {
                this.checkfilter.searchValues[key] = [];
              }
            }
          }
          this.getFiltarOfExtranalFilter();
    },
    
    getFiltarOfExtranalFilter(perPage = 10,) {
          axios
            .post(
              this.globalVariables.apiUrl + "admin/manage/doppcall-team/search-get-data-all-filter",
              this.checkfilter,
              {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
              }
            )
            .then((res) => {
              if ($.fn.DataTable.isDataTable("#super_admin_datatables")) {
                const table = $("#super_admin_datatables").DataTable();
                table.clear();
                table.rows.add(res.data ?? []);
                table.draw();
              } else {
                var table = $('#super_admin_datatables').DataTable({
                  data: res.data,
                  columns: [
                    // { data: 'id' },
                    { data: 'id'},
                    { data: "name",
                      render: function (data, type, full, meta) {
                        if(full?.name != null && full?.name != ''){
                          return '<span title="'+full?.name+'">'+full?.name+'</span>';
                        }else{
                          return '----';
                        }
                      }
                    },
                    { data: "fname",
                      render: function (data, type, full, meta) {
                        if(full?.fname != null && full?.fname != ''){
                          return '<span title="'+full?.fname+'">'+full?.fname+'</span>';
                        }else{
                          return '----';
                        }
                      }
                    },
                    { data: "lname",
                      render: function (data, type, full, meta) {
                        if(full?.lname != null && full?.lname != ''){
                          return '<span title="'+full?.lname+'">'+full?.lname+'</span>';
                        }else{
                          return '----';
                        }
                      }
                    },
                    { data: "slug",
                      render: function (data, type, full, meta) {
                        if(full?.slug != null && full?.slug != ''){
                          return '<span title="'+full?.slug+'">'+full?.slug+'</span>';
                        }else{
                          return '----';
                        }
                      }
                    },
                    { data: "email",
                      render: function (data, type, full, meta) {
                        if(full?.email != null && full?.email != ''){
                          return '<span title="'+full?.email+'">'+full?.email+'</span>';
                        }else{
                          return '----';
                        }
                      }
                    },
                    {
                      data: "secondary_name",
                      render: function (data, type, row) {
                        return `<span title="${row?.role?.secondary_name}" class="badge bg-success">${row?.role?.secondary_name}</span>`;
                      },
                    },
                    {
                      data: "phone_no",
                      render: function (data, type, row) {
                        if (row.phone_no != null && row?.phone_no != '') {
                          return '<span title="'+row?.phone_no+'">'+row?.phone_no+'</span>';
                        }
                        return "--------";
                      },
                    },
                    {
                      data: "company_name",
                      render: function (data, type, row) {
                        if (row.company_name != null && row?.company_name != '') {
                          return '<span title="'+row?.company_name+'">'+row?.company_name+'</span>';
                        }
                        return "--------";
                      },
                    },
                    {
                      data: "company_website",
                      render: function (data, type, row) {
                        if (row.company_website != null && row?.company_website != '') {
                          return '<span title="'+row?.company_website+'">'+row?.company_website+'</span>';
                        }
                        return "--------";
                      },
                    },
                    {
                      data: "monthly_visitors",
                      render: function (data, type, row) {
                        if (row.monthly_visitors != null && row?.monthly_visitors != '') {
                          return '<span title="'+row?.monthly_visitors+'">'+row?.monthly_visitors+'</span>';
                        }
                        return "--------";
                      },
                    },
                    {
                      data: "user_offers",
                      render: function (data, type, row) {
                        if (row.user_offers != null && row?.user_offers != '') {
                          return '<span title="'+row?.user_offers+'">'+row?.user_offers+'</span>';
                        }
                        return "--------";
                      },
                    },
                    {
                      data: "traffic_urls",
                      render: function (data, type, row) {
                        if (row.traffic_urls != null && row?.traffic_urls != '') {
                          return '<span title="'+row?.traffic_urls+'">'+row?.traffic_urls+'</span>';
                        }
                        return "--------";
                      },
                    },
                    {
                      data: "country_code",
                      render: function (data, type, row) {
                        if (row.country_code != null && row?.country_code != '') {
                          return '<span title="'+row?.country_code+'">'+row?.country_code+'</span>';
                        }
                        return "--------";
                      },
                    },
                    {
                      data: "browser",
                      render: function (data, type, row) {
                        if (row.browser != null && row?.browser != '') {
                          return '<span title="'+row?.browser+'">'+row?.browser+'</span>';
                        }
                        return "--------";
                      },
                    },
                    {
                      data: "os",
                      render: function (data, type, row) {
                        if (row.os != null && row?.os != '') {
                          return '<span title="'+row?.os+'">'+row?.os+'</span>';
                        }
                        return "--------";
                      },
                    },
                    {
                      data: "skype",
                      render: function (data, type, row) {
                        if (row.skype != null && row?.skype != '') {
                          return '<span title="'+row?.skype+'">'+row?.skype+'</span>';
                        }
                        return "--------";
                      },
                    },
                    {
                      data: "telegram",
                      render: function (data, type, row) {
                        if (row.telegram != null && row?.telegram != '') {
                          return '<span title="'+row?.telegram+'">'+row?.telegram+'</span>';
                        }
                        return "--------";
                      },
                    },
                    {
                      data: "facebook",
                      render: function (data, type, row) {
                        if (row.facebook != null && row?.facebook != '') {
                          return '<span title="'+row?.facebook+'">'+row?.facebook+'</span>';
                        }
                        return "--------";
                      },
                    },
                    { data: "is_email_verified",
                        render: function (data, type, row) {
                          if (row?.is_email_verified != null) {
                            return '<span title="Verified" class="badge bg-success">Verified</span>';
                          }else {
                            return '<span title="Unverified" class="badge bg-danger">Unverified</span>';
                          }
                        },
                      },
                    { data: "convart_status" },
                    {
                      data: "created_at",
                      render: function (data, type, row) {
                        if (row.created_at != null) {
                          return formateDate(row.created_at);
                        }
                        return "--------";
                      },
                    },
                    { data: "convart_action" },
                  ],
                  initComplete: () => { 
                    $('#super_admin_datatables').wrap('<div class="commonDataTablesClass"></div>');
                    const table = $("#super_admin_datatables").DataTable();
                        const dropdownItems = document.querySelectorAll('.dropdown-menu .dropdown-item');

                        dropdownItems.forEach((item) => {
                          const columnAttr = item.getAttribute("data-column"); 
                          if (columnAttr === "all") {
                            item.addEventListener("click", function (e) {
                              e.preventDefault();
                              table.columns().visible(true);
                              dropdownItems.forEach((el) => {
                                if (el.getAttribute("data-column") !== "all") {
                                  el.classList.add("active");
                                }
                              });
                            });
                          } else {
                            const columnIndex = parseInt(columnAttr);
                            const column = table.column(columnIndex);
                            if (column.visible()) {
                              item.classList.add("active");
                            }

                            item.addEventListener("click", function (e) {
                              e.preventDefault();

                              const currentVisible = column.visible();
                              column.visible(!currentVisible);

                              if (!currentVisible) {
                                item.classList.add("active");
                              } else {
                                item.classList.remove("active");
                              }
                            });
                          }
                        });
                        $('.select-colunm-position').on('click', function (e) {
                          e.stopPropagation();
                        });

                        $('.select-colunm-position .dropdown-item').on('click', function (e) {
                          e.stopPropagation();
                        });
                    this.attachEventDoppCallTeam();
                    this.attachEventListenersOfButton();
                    this.attachEventListenersDoppCallTeamBlulkAction();
                    this.attachEventListenersDoppCallTeamBlulkActionSubmit();
                  },
                  createdRow: function (row, data, dataIndex) {
                      $("td:eq(0)", row).html(dataIndex + 1);
                    },
                  columnDefs: [
                    {
                      targets: 0,
                      orderable: false,
                      checkboxes: {
                        selectAllRender: '<input type="checkbox" class="form-check-input ms-1">',
                      },
                      render: function (data, type, row) {
                        return `<input type="checkbox" class="dt-checkboxes form-check-input ms-1 row-checkbox" data-id="${row.id}">`;
                      },
                      searchable: false
                    },
                    {
                      targets: 4, 
                      visible: false,
                    },
                    {
                      targets: 8, 
                      visible: false,
                    },
                    {
                      targets: 9, 
                      visible: false,
                    },
                    {
                      targets: 10, 
                      visible: false,
                    },
                    {
                      targets: 11, 
                      visible: false,
                    },
                    {
                      targets: 12, 
                      visible: false,
                    },
                    {
                      targets: 13, 
                      visible: false,
                    },
                    {
                      targets: 14, 
                      visible: false,
                    },
                    {
                      targets: 15, 
                      visible: false,
                    },
                    {
                      targets: 16, 
                      visible: false,
                    },
                    {
                      targets: 17, 
                      visible: false,
                    },
                    {
                      targets: 18, 
                      visible: false,
                    },
                    {
                      targets: 20, 
                      visible: false,
                    },
                  ],
                  order: [[2, 'desc']],
                  dom: '<"row mx-2"' +
                    '<"col-md-4 px-0"f>' + 
                    '<"col-md-8 dopp_tb d-flex justify-content-end align-items-center"l<"button-wrapper"B>>' + 
                    '<"col-md-3 d-none"p>>' +
                    't' + 
                    '<"row mx-2"' +
                    '<"col-md-5"i>' + 
                    '<"col-md-7"p>>', 
                  displayLength: 10, 
                  lengthMenu: [10, 20, 50, 100, 200], 
                  language: {
                    sLengthMenu: '_MENU_',
                    search: '', 
                    searchPlaceholder: 'Search Manage Doppcall Team',
                    paginate: { 
                      previous: '<i class="fa-solid fa-chevron-left"></i>',
                      next: '<i class="fa-solid fa-chevron-right"></i>'
                    }
                  },
                  buttons: [
                      {
                        text: `
                          <div id="bulk-action-wrapper">
                            <select id="bulk-action-select-second" class="form-select form-select-sm">
                              <option value=""> ✓ Bulk Actions</option>
                              <option value="delete">Bulk Delete</option>
                              <option value="0">Bulk Pending</option>
                              <option value="1">Bulk Approved</option>
                              <option value="2">Bulk Suspend</option>
                              <option value="3">Bulk Unsuspend</option>
                              <option value="4">Bulk Pause</option>
                              <option value="5">Bulk Resume</option>
                            </select>
                          </div>
                        `,
                        className: "me-2 p-0 btn-primary d-none",
                        attr: { id: "bulk-action-container-second" },
                      },
                      {
                        extend: "collection",
                        className: "btn btn-label-primary dropdown-toggle me-3",
                        text: '<i class="ti ti-screen-share me-1 ti-xs"></i>Export',
                        buttons: [
                          {
                            extend: "print",
                            text: '<i class="ti ti-printer me-1 ti-xs text-primary"></i>Print',
                            className: "dropdown-item",
                            exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
                          },
                          {
                            extend: "csv",
                            text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                            className: "dropdown-item",
                            exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
                          },
                          {
                            extend: "excel",
                            text:
                              '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                            className: "dropdown-item",
                            exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
                          },
                          {
                            extend: "pdf",
                            text:
                              '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                            className: "dropdown-item",
                            exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
                          },
                          {
                            extend: "copy",
                            text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                            className: "dropdown-item",
                            exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
                          },
                        ],
                      },
                      {
                        text:
                          '<span><i class="ti ti-plus me-1 ti-xs"></i>Add Invite Member</span>',
                        className: "btn btn-primary me-2",
                        action: function () {
                          const modalElement = document.getElementById("inviteMemberModal");
                          const modalInstance = new bootstrap.Modal(modalElement);
                          modalInstance.show();
                        },
                      },
                      {
                      className: "btn btn-primary me-2",
                      text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">Name</a></li><li><a class="dropdown-item" href="#" data-column="2">First Name</a></li><li><a class="dropdown-item" href="#" data-column="3">Last Name</a></li><li><a class="dropdown-item" href="#" data-column="4">Slug</a></li><li><a class="dropdown-item" href="#" data-column="5">Email</a></li><li><a class="dropdown-item" href="#" data-column="6">Role</a></li><li><a class="dropdown-item" href="#" data-column="7">Phone</a></li><li><a class="dropdown-item" href="#" data-column="8">Company</a></li><li><a class="dropdown-item" href="#" data-column="9">Company Website</a></li><li><a class="dropdown-item" href="#" data-column="10">Monthly Visitors</a></li><li><a class="dropdown-item" href="#" data-column="11">User Offers</a></li><li><a class="dropdown-item" href="#" data-column="12">Traffic Urls</a></li><li><a class="dropdown-item" href="#" data-column="13">Country Code</a></li><li><a class="dropdown-item" href="#" data-column="14">Browser</a></li><li><a class="dropdown-item" href="#" data-column="15">OS</a></li><li><a class="dropdown-item" href="#" data-column="16">Skype</a></li><li><a class="dropdown-item" href="#" data-column="17">Telegram</a></li><li><a class="dropdown-item" href="#" data-column="18">Facebook</a></li><li><a class="dropdown-item" href="#" data-column="19">Status</a></li><li><a class="dropdown-item" href="#" data-column="20">Email Verified</a></li><li><a class="dropdown-item" href="#" data-column="21">Created At</a></li><li><a class="dropdown-item" href="#" data-column="22">Action</a></li></div></ul></div>',
                    },
                        {
                      text:
                        '<span id="all_filters" class="all_filters"><i class="fa-solid fa-magnifying-glass me-1"></i>All Filters</span>',
                      className: "btn btn-primary",
                      attr: { id: "all_filters"},
                    },
                  ],
                });
              };
              this.getLoader = false;
            })
            .catch((error) => {
              console.error(error);
            })
            .finally(() => {
              // this.getSkeletonLoader = false;
              this.getLoader = false;
    });
    },

    formatDates(date) {
      return moment(date).format('D MMMM YYYY');
    },

    attachEventListenersDoppCallTeamBlulkAction() {
      $('#super_admin_datatables').on('change', '.row-checkbox', (event) => {
        const id = parseInt(event.target.dataset.id);
        if (event.target.checked) {
          if (!this.bulkactionadminids.selectedIds.includes(id)) {
            this.bulkactionadminids.selectedIds.push(id);
          }
        } else {
          this.bulkactionadminids.selectedIds = this.bulkactionadminids.selectedIds.filter(item => item !== id);
        }

        this.toggleBulkActionAdminVisibility();
      });
      $('#super_admin_datatables thead').on('change', 'input[type="checkbox"]', (event) => {
        const isChecked = event.target.checked;
        $('#super_admin_datatables tbody .row-checkbox').each((index, checkbox) => {
          checkbox.checked = isChecked;
          const id = parseInt(checkbox.dataset.id);

          if (isChecked) {
            if (!this.bulkactionadminids.selectedIds.includes(id)) {
              this.bulkactionadminids.selectedIds.push(id);
            }
          } else {
            this.bulkactionadminids.selectedIds = [];
          }
        });

        this.toggleBulkActionAdminVisibility();
      });
    },

    attachEventListenersDoppCallTeamBlulkActionSubmit() {
      $('#bulk-action-select-second').off().on('change', (e) => {
        const action = e.target.value;
        if (!action || this.bulkactionadminids.selectedIds.length === 0) {
          return;
        }
        
        if (action === 'delete') {
          this.bulkAdminDelete();
        } else {
          if (action === "0") {
            this.bulkactionadminids.status = '0';
            const alertTitle = "User Want to Pending";
            this.bulkAdminStatusChange(alertTitle);
          } else if (action === "1") {
            this.bulkactionadminids.status = '1';
            const alertTitle = "User Want to Approved";
            this.bulkAdminStatusChange(alertTitle);
          } else if (action === "2") {
            this.bulkactionadminids.status = '2';
            const alertTitle = "User Want to Suspend";
            this.bulkAdminStatusChange(alertTitle);
          } else if (action === "3") {
            this.bulkactionadminids.status = '3';
            const alertTitle = "User Want to Unsuspend";
            this.bulkAdminStatusChange(alertTitle);
          }else if (action === "4"){
            this.bulkactionadminids.status = '4';
            const alertTitle = "User Want to Pause";
            this.bulkAdminStatusChange(alertTitle);
          }else{
            this.bulkactionadminids.status = '5';
            const alertTitle = "User Want to Resume";
            this.bulkAdminStatusChange(alertTitle);
          }
        }
        $('#bulk-action-select-second').val('');
      });
    },

    toggleBulkActionAdminVisibility() {
      const bulkActionWrapperSecond = $('#bulk-action-container-second');
      if (this.bulkactionadminids.selectedIds.length > 0) {
        bulkActionWrapperSecond?.removeClass('d-none');
      } else {
        bulkActionWrapperSecond?.addClass('d-none');
      }
    },

    bulkAdminDelete() {
      Swal.fire({
        text: 'Are Sure Delete',
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.value) {
          const modalElement = document.getElementById('bulkDeleteModal');
          const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
          if(modal){
            modal.show();
          }
        }
      });
    },

    bulkactionsubmission(){
      (this.getLoader = true),
            axios
              .post(
                this.globalVariables.apiUrl + "admin/manage/super-admin/delete/bulk",
                this.bulkactionadminids,
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              )
              .then((res) => {
                if (res.data.status == "success") {
                  toastr.success(res.data.message);
                  this.getDoppcallTeams();
                  const modalElement = document.getElementById('bulkDeleteModal');
                  const modals = bootstrap.Modal.getInstance(modalElement);
                  if(modals){
                    modals.hide();
                  }
                } else {
                  toastr.error(res.data.message);
                }
              })
              .catch((error) => {
                if (error?.response?.data?.errors) {
                  this.validationErrorsForNote = error.response.data.errors;
                }
              })
              .finally(() => {
                this.getLoader = false;
              });
    },

    bulkAdminStatusChange(alertTitle) {
      Swal.fire({
        text: alertTitle,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.value) {
          (this.getLoader = true),
            axios
              .post(
                this.globalVariables.apiUrl + "admin/manage/super-admin/status/bulk",
                this.bulkactionadminids,
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              )
              .then((res) => {
                if (res.data.status == "success") {
                  toastr.success(res.data.message);
                  this.getDoppcallTeams();
                } else {
                  toastr.error(res.data.message);
                }
              })
              .catch((e) => {
                return e;
              })
              .finally(() => {
                this.getLoader = false;
              });
        }
      });
    },


    attachEventDoppCallTeam() {
      $("#super_admin_datatables").on("click", ".super-admin-action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.data('action');
        this.deleteUser.user_id = dataId;
        if(dataClass === 'delete-btn'){
          Swal.fire({
            text: "Are you sure delete",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
          }).then((result) => {
            if (result.value) {
              if (result.value) {
                const modalElement = document.getElementById('singleDeleteModal');
                const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
                if(modal){
                  modal.show();
                }
              } 
            }
          });
        }else if(dataClass === 'pause-btn'){
          this.changeStatus.data = dataId;
          this.changeStatus.action_type = 'pause';
          const alertTitle = 'Want to Push';
          this.ActionMethod(alertTitle);

        }else if(dataClass === 'resume-btn'){
          this.changeStatus.data = dataId;
          this.changeStatus.action_type = 'resume';
          const alertTitle = 'Want to Resume';
          this.ActionMethod(alertTitle);

        }else if(dataClass === 'approved-btn'){
          this.changeStatus.data = dataId;
          this.changeStatus.action_type = 'approved';
          const alertTitle = 'Want to Approved';
          this.ActionMethod(alertTitle);

        }else if(dataClass === 'pending-btn'){
          this.changeStatus.data = dataId;
          this.changeStatus.action_type = 'pending';
          const alertTitle = 'Want to Pending';
          this.ActionMethod(alertTitle);

        }else if(dataClass === 'suspend-btn'){
          this.changeStatus.data = dataId;
          this.changeStatus.action_type = 'suspend';
          const alertTitle = 'Want to Suspend';
          this.ActionMethod(alertTitle);

        }else if(dataClass === 'unsuspend-btn'){
          this.changeStatus.data = dataId;
          this.changeStatus.action_type = 'unsuspend';
          const alertTitle = 'Want to Unsuspend';
          this.ActionMethod(alertTitle);

        }else if(dataClass === 'permission-create-model'){
          this.createUserPermission.user_id = dataId;
        }else if(dataClass === 'permission-edit-model'){
          this.createUserPermission.user_id = dataId;
          this.modalTitle = 'Permission Edit';
          axios
            .get(this.globalVariables.apiUrl+"admin/manage/user-permission/"+dataId, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              if(res.data.status == 'success'){
                this.selectedValues = res && res.data && res.data.user;
              }
            })
            .catch((e) => {
              return e;
            })
        }else if(dataClass === 'manage-roles'){
          this.changeUserRole.user_id = dataId;
        }
      });
    },

    deleteTeamMemberWithNote(){
      (this.getLoader = true),
        axios
          .post(
            this.globalVariables.apiUrl+"admin/manage/user/delete",this.deleteUser,{
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((res) => {
            if(res.data.status == 'success'){
              toastr.success(res.data.message);
              this.getDoppcallTeams();
              const modalElement = document.getElementById('singleDeleteModal');
              const modals = bootstrap.Modal.getInstance(modalElement);
              if(modals){
                modals.hide();
              }
            }else{
              toastr.error(res.data.message);
            }
          })
          .catch((error) => {
                if (error?.response?.data?.errors) {
                  this.validationErrorsForNote = error.response.data.errors;
                }
              })
          .finally(() => {
            this.getLoader = false;
          });
    },

    // getAccountManagers() {
    //   this.getLoader = true;
    //   axios
    //     .get(this.globalVariables.apiUrl+"admin/manage/account-manager/get-data", {
    //       headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    //     })
    //     .then((res) => {
    //       if ($.fn.DataTable.isDataTable("#account_manager_datatables")) {
    //       $('#account_manager_datatables').DataTable().destroy();
    //     }
    //     var table = $('#account_manager_datatables').DataTable({
    //       data: res.data,
    //       columns: [
    //         // { data: 'id' },
    //         { data: null},
    //         { data: "full_name" },
    //         { data: "email" },
    //         { data: "phone_no" },
    //         { data: "convart_status" },
    //         { data: "convart_action" },
    //       ],
    //       initComplete: () => { 
    //         this.attachEventAccountManager();
    //         this.attachEventListenersOfButton();
    //       },
    //       createdRow: function (row, data, dataIndex) {
    //           $("td:eq(0)", row).html(dataIndex + 1);
    //         },
    //       columnDefs: [
    //         {
    //           targets: 0,
    //           orderable: false,
    //           checkboxes: {
    //             selectAllRender: '<input type="checkbox" class="form-check-input">'
    //           },
    //           render: function () {
    //             return '<input type="checkbox" class="dt-checkboxes form-check-input" >';
    //           },
    //           searchable: false
    //         },
    //       ],
    //       order: [[2, 'desc']],
    //       dom: '<"row mx-2"' +
    //         '<"col-md-4 px-0"f>' + 
    //         '<"col-md-8 dopp_tb d-flex justify-content-end align-items-center"l<"button-wrapper"B>>' + 
    //         '<"col-md-3 d-none"p>>' +
    //         't' + 
    //         '<"row mx-2"' +
    //         '<"col-md-5"i>' + 
    //         '<"col-md-7"p>>', 
    //       displayLength: 10, 
    //       lengthMenu: [10, 20, 50, 100, 200], 
    //       language: {
    //         sLengthMenu: '_MENU_',
    //         search: '', 
    //         searchPlaceholder: 'Search Account Managers',
    //         paginate: { 
    //           previous: '<i class="fa-solid fa-chevron-left"></i>',
    //           next: '<i class="fa-solid fa-chevron-right"></i>'
    //         }
    //       },
    //       buttons: [
    //         {
    //           text: '<span id="create"><i class="ti ti-plus me-1 ti-xs"></i>Create</span>',
    //           className: 'create-new btn btn-primary',
    //           attr: { id: 'create' },
    //         }
    //       ],
    //     });
    //     this.getLoader = false;
    //     })
    //     .catch((e) => {
    //       return e;
    //     })
    //     .finally(() => {
    //       this.getLoader = false;
    //     });
    // },

    attachEventAccountManager() {
      $("#account_manager_datatables").on("click", ".dropdown-item", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.attr('class');
        this.deleteUser.data = dataId;
        if(dataClass === 'dropdown-item edit-btn'){
          this.$router.push('/admin-manage-publishers-edit/'+dataId);
        }else if(dataClass === 'dropdown-item delete-btn'){
          Swal.fire({
            text: "Are you sure delete",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
          }).then((result) => {
            if (result.value) {
              (this.getLoader = true),
                axios
                  .post(
                    this.globalVariables.apiUrl+"admin/manage/user/delete",this.deleteUser,{
                      headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                      },
                    }
                  )
                  .then((res) => {
                    if(res.data.status == 'success'){
                      toastr.success(res.data.message);
                      // this.getAccountManagers();
                      this.callAllNext();
                    }else{
                      toastr.error(res.data.message);
                    }
                  })
                  .catch((e) => {
                    return e;
                  })
                  .finally(() => {
                    this.getLoader = false;
                  });
            }
          });
        }else if(dataClass === 'dropdown-item pause-btn'){
          this.changeStatus.data = dataId;
          this.changeStatus.action_type = 'pause';
          const alertTitle = 'Want to Push';
          this.ActionMethod(alertTitle);

        }else if(dataClass === 'dropdown-item resume-btn'){
          this.changeStatus.data = dataId;
          this.changeStatus.action_type = 'resume';
          const alertTitle = 'Want to Resume';
          this.ActionMethod(alertTitle);

        }else if(dataClass === 'dropdown-item approved-btn'){
          this.changeStatus.data = dataId;
          this.changeStatus.action_type = 'approved';
          const alertTitle = 'Want to Approved';
          this.ActionMethod(alertTitle);

        }else if(dataClass === 'dropdown-item pending-btn'){
          this.changeStatus.data = dataId;
          this.changeStatus.action_type = 'pending';
          const alertTitle = 'Want to Pending';
          this.ActionMethod(alertTitle);

        }else if(dataClass === 'dropdown-item suspend-btn'){
          this.changeStatus.data = dataId;
          this.changeStatus.action_type = 'suspend';
          const alertTitle = 'Want to Suspend';
          this.ActionMethod(alertTitle);

        }else if(dataClass === 'dropdown-item unsuspend-btn'){
          this.changeStatus.data = dataId;
          this.changeStatus.action_type = 'unsuspend';
          const alertTitle = 'Want to Unsuspend';
          this.ActionMethod(alertTitle);

        }
      });
    },

    // attachEventListenersOfButton(){
    //   $("#account_manager_datatables_wrapper").on("click", "button", (event) => {
    //     const target = $(event.target);
    //     const dataClass = target.attr("id");
    //     if (dataClass === "create") {
    //       this.$router.push("/manage/account/manager/create");
    //     } 
    //   });
    // },

    ActionMethod(alertTitle){
      Swal.fire({
        text: alertTitle,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.value) {
          this.getLoader = true,
          axios
            .post(this.globalVariables.apiUrl+"admin/manage/user/account-access", this.changeStatus, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              if(res.data.status == 'success'){
                toastr.success(res.data.message);
                this.getDoppcallTeams();
                // this.getAccountManagers();
                this.callAllNext();
              }else{
                toastr.error(res.data.message);
              }
            })
            .catch((e) => {
              return e;
            })
            .finally(()=> {
              this.getLoader = false;
            });
          } 
      });
    },

    toggleAll() {
      if (this.allChecked) {
        this.selectedValues = [...this.checkBoxOptions]; 
      } else {
        this.selectedValues = []; 
      }
    },

    createPermisstion(){
      this.createUserPermission.permisstion = this.selectedValues;
      if(this.selectedValues != null && this.selectedValues != ''){
        this.getLoader = true;
        axios
            .post(this.globalVariables.apiUrl+"admin/manage/user-permissions", this.createUserPermission, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              if(res.data.status == 'success'){
                toastr.success(res.data.message);
                this.getDoppcallTeams();
                // this.getAccountManagers();
                this.callAllNext();
                this.selectedValues = [];
                const modal = document.getElementById("permissionModal");
                const bootstrapModal = bootstrap.Modal.getInstance(modal);
                if (bootstrapModal) {
                  bootstrapModal.hide();
                }
              }else{
                toastr.error(res.data.message);
              }
            })
            .catch((e) => {
              return e;
            })
            .finally(()=> {
              this.getLoader = false;
            });
      }else{
        toastr.warning('Select any permisstion');
      }
    },

    userRoleChange(){
        this.getLoader = true;
        axios
          .post(this.globalVariables.apiUrl+"admin/manage/role-change", this.changeUserRole, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            if(res.data.status == 'success'){
              toastr.success(res.data.message);
              this.getDoppcallTeams();
              this.callAllNext();
              this.selectedValues = [];
              const modal = document.getElementById("roleChangeModal");
              const bootstrapModal = bootstrap.Modal.getInstance(modal);
              if (bootstrapModal) {
                bootstrapModal.hide();
              }
            }else{
              toastr.error(res.data.message);
            }
          })
          .catch((error) => {
            if (error?.response?.data?.errors) {
              this.validationErrorsForChangeRole = error.response.data.errors;
            }
          })
          .finally(()=> {
            this.getLoader = false;
          });
    },
  },
};
</script>
<style>

#invitations_tables colgroup:nth-of-type(2) {
	display: none !important;
}

#super_admin_datatables colgroup:nth-of-type(2) {
	display: none !important;
}

#account_manager_datatables colgroup:nth-of-type(2) {
	display: none !important;
}
#invitations_tables .dt-checkboxes-cell{
	padding: 0.7rem 0.5rem !important;
}
#super_admin_datatables .dt-checkboxes-cell{
	padding: 0.7rem 0.5rem !important;
}
#account_manager_datatables .dt-checkboxes-cell{
	padding: 0.7rem 0.5rem !important;
}
  .dropdown-item {
	align-items: center;
}
#dropdownMenuButton {
	background: transparent;
}
</style>
