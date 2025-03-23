<template>
  <div v-if="getLoader">
    <Loader></Loader>
  </div>
  <!-- Content wrapper -->
  <div class="content-wrapper">
    <!-- Content -->
    <div class="container-xxl flex-grow-1 container-p-y">
      <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>

      <!-- Header -->
      <div class="row mt-3">
        <div class="col-12" id="publishers_account">
          <div class="card mb-4">
            <div class="user-profile-header-banner">
              <img :src="bannnerImage" alt="image" class="rounded-top" />
            </div>
            <div class="user-profile-header d-flex flex-column flex-sm-row text-sm-start text-center mb-4">
              <div class="flex-shrink-0 mt-n2 mx-sm-0 mx-auto">
                <img :src="userShowImage.avatar"  alt="user image" class="d-block h-auto ms-0 ms-sm-4 rounded user-profile-img"/>
              </div>
              <div class="flex-grow-1 mt-3 mt-sm-5">
                <div class="d-flex align-items-md-end align-items-sm-start align-items-center justify-content-md-between justify-content-start mx-4 flex-md-row flex-column gap-4"
                >
                  <div class="user-profile-info">
                    <h4>
                      {{ userData && userData.fname }} {{ userData && userData.lname }}
                    </h4>
                    <ul class="list-inline mb-0 d-flex align-items-center flex-wrap justify-content-sm-start justify-content-center gap-2">
                      <li class="list-inline-item d-flex gap-1">
                        <i class="ti ti-color-swatch"></i>
                        {{ userData && userData.role && userData.role.name }}
                      </li>
                      <template v-if="userData && userData.user_address && userData.user_address.address " >
                        <li class="list-inline-item d-flex gap-1">
                          <i class="ti ti-map-pin"></i>
                          {{ userData && userData.user_address && userData.user_address.address }}
                        </li>
                      </template>
                      <li class="list-inline-item d-flex gap-1">
                        <i class="ti ti-calendar"></i> Joined
                        {{ formatDates(userData && userData.created_at) }}
                      </li>
                    </ul>
                  </div>
                  <a href="javascript:void(0)" class="btn btn-primary btn-sm">
                    <i class="ti ti-check me-1"></i>Connected
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--/ Header -->

      <div class="row">
        <div class="col-12">
          <ul class="nav panel-tabs main-nav-line mb-3" id="tab_panels">
            <li>
              <button class="nav-link text-dark custom-nav-link" :class="tabid == 'my_profile' ? 'active' : ''" @click="changeAccountTab('my_profile')" >
                <i class="far fa-user w-40 me-1"></i>My Profile
              </button>
            </li>
            <li>
              <button @click="changeAccountTab('settings')"  class="nav-link text-dark custom-nav-link"  :class="tabid == 'settings' ? 'active' : ''" >
                <i class="fas fa-cog w-40 me-1"></i>Settings
              </button>
            </li>
            <li>
              <button  @click="changeAccountTab('payment_settings')" class="nav-link text-dark custom-nav-link" :class="tabid == 'payment_settings' ? 'active' : ''" >
                <i class="far fa-credit-card w-40 me-1"></i> Payment Settings
              </button>
            </li>
            <li>
              <button class="nav-link text-dark custom-nav-link" @click="changeAccountTab('ringba_aaccount')" :class="tabid == 'ringba_aaccount' ? 'active' : ''">
                <i class="fas fa-user-lock w-40 me-1"></i>Ringba Account
              </button>
            </li>
            <li>
              <button class="nav-link text-dark custom-nav-link" @click="changeAccountTab('my_account_manager')" :class="tabid == 'my_account_manager' ? 'active' : ''" >
                <i class="far fa-user w-40 me-1"></i>My Account Manager
              </button>
            </li>
            <li>
              <button class="nav-link text-dark custom-nav-link"  @click="changeAccountTab('payment_history')" :class="tabid == 'payment_history' ? 'active' : ''" >
                <i class="fas fa-shopping-basket w-40 me-1"></i>Payment History
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div class="row mt-4">
        <div class="row">
          <div class="col-md-3">
            <!-- About User -->
            <div class="card mb-4">
              <div class="card-body">
                <small class="card-text text-uppercase">About</small>
                <ul class="list-unstyled mb-4 mt-3">
                  <li class="d-flex align-items-center mb-3">
                    <i class="ti ti-user text-heading"></i
                    ><span class="fw-medium mx-2 text-heading">Full Name:</span>
                    <span
                      >{{ userData && userData.fname }}
                      {{ userData && userData.lname }}</span
                    >
                  </li>
                  <li class="d-flex align-items-center mb-3">
                    <i class="ti ti-crown text-heading"></i
                    ><span class="fw-medium mx-2 text-heading">Role:</span>
                    <span>{{ userData && userData.role && userData.role.name }}</span>
                  </li>
                  <template
                    v-if="
                      userData && userData.user_address && userData.user_address.address
                    "
                  >
                    <li class="d-flex align-items-center mb-3">
                      <i class="ti ti-flag text-heading"></i
                      ><span class="fw-medium mx-2 text-heading">Country:</span>
                      <span>{{
                        userData && userData.user_address && userData.user_address.country
                      }}</span>
                    </li>
                  </template>
                </ul>
                <small class="card-text text-uppercase">Contacts</small>
                <ul class="list-unstyled mb-4 mt-3">
                  <template v-if="userData && userData.phone_no">
                    <li class="d-flex align-items-center mb-3">
                      <i class="ti ti-phone-call"></i
                      ><span class="fw-medium mx-2 text-heading">Contact:</span>
                      <span>{{ userData && userData.phone_no }}</span>
                    </li>
                  </template>

                  <template
                    v-if="
                      userData && userData.user_address && userData.user_address.skype_id
                    "
                  >
                    <li class="d-flex align-items-center mb-3">
                      <i class="ti ti-brand-skype"></i
                      ><span class="fw-medium mx-2 text-heading">Skype:</span>
                      <span>{{
                        userData &&
                        userData.user_address &&
                        userData.user_address.skype_id
                      }}</span>
                    </li>
                  </template>

                  <li class="d-flex align-items-center mb-3">
                    <i class="ti ti-mail"></i
                    ><span class="fw-medium mx-2 text-heading">Email:</span>
                    <span>{{ userData && userData.email }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <!--/ About User -->
          </div>
          <div class="col-md-9">
            <template v-if="tabid == 'my_profile'">
              <form>
                <div class="card padding-standart3 p-5">
                  <div class="card-title-custom mb-24px pb-3">My profile</div>
                  <div class="row form-group form-group-m1 mb-5">
                    <div class="col-md-12 mb-3">
                      <div class="row align-items-center">
                        <div class="col-sm-10" id="publisher_image">
                          <div class="avatar-upload">
                            <div class="avatar-edit">
                              <input
                                type="file"
                                id="imageUpload"
                                accept=".png, .jpg, .jpeg"
                                @change="primaryLogo($event)"
                              />
                              <label for="imageUpload"
                                ><i class="p-2 fa-solid fa-pencil"></i
                              ></label>
                            </div>
                            <div class="avatar-preview" id="avatar_preview">
                              <template v-if="userShowImage.avatar != null">
                                <div
                                  id="imagePreview"
                                  :style="{
                                    backgroundImage: `url(${userShowImage.avatar})`,
                                  }"
                                ></div>
                              </template>
                              <template v-else>
                                <template v-if="userData && userData.avatar != null">
                                  <div
                                    id="imagePreview"
                                    :style="{
                                      backgroundImage: `url(${userData.avatar})`,
                                    }"
                                  ></div>
                                </template>
                                <template v-else>
                                  <div
                                    id="imagePreview"
                                    :style="{
                                      backgroundImage:
                                        'url(' +
                                        globalVariables.appUrl +
                                        'backend/images/no-image.png' +
                                        ')',
                                    }"
                                  ></div>
                                </template>
                              </template>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row form-group form-group-m1 mb-24px">
                    <div class="col-sm-3">
                      <label for="email">Email</label>
                    </div>
                    <div class="col-sm-9">
                      <input
                        type="email"
                        v-model="userUpdate.email"
                        class="form-control"
                      />
                    </div>
                  </div>

                  <div class="row form-group form-group-m1 mb-24px mt-3">
                    <div class="col-sm-3">
                      <label for="phone">Phone</label>
                    </div>
                    <div class="col-sm-9">
                      <input
                        type="tel"
                        v-model="userUpdate.phone"
                        class="form-control"
                        readonly
                      />
                    </div>
                  </div>

                  <div class="row form-group form-group-m1 mb-24px mt-3">
                    <div class="col-sm-3">
                      <label for="first_name">First Name</label>
                    </div>
                    <div class="col-sm-9">
                      <input
                        type="text"
                        v-model="userUpdate.first_name"
                        class="form-control"
                      />
                    </div>
                  </div>

                  <div class="row form-group form-group-m1 mb-24px mt-3">
                    <div class="col-sm-3">
                      <label for="last_name">Last Name</label>
                    </div>
                    <div class="col-sm-9">
                      <input
                        type="text"
                        v-model="userUpdate.last_name"
                        class="form-control"
                      />
                    </div>
                  </div>

                  <div class="form-group row form-group-m2 mb-32px mt-3">
                    <label class="col-lg-3 col-form-label fullhd-width inline-padding"
                      >Type</label
                    >
                    <div class="col-lg-9">
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input p-1"
                          type="radio"
                          v-model="userUpdate.type"
                          id="person"
                          value="1"
                        />
                        <label class="form-check-label" for="person">Person</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input p-1"
                          type="radio"
                          v-model="userUpdate.type"
                          id="legal"
                          value="2"
                        />
                        <label class="form-check-label" for="legal">Legal Entity</label>
                      </div>
                    </div>
                  </div>

                  <div class="form-group row mb-0 mt-3">
                    <div class="col-12">
                      <label
                        class="col-12 col-form-label grey-color pt-0"
                        style="padding-left: 0"
                        >Preferred communication type</label
                      >
                    </div>

                    <div class="col-md-4">
                      <select
                        v-model="userUpdate.communication_type"
                        class="form-control"
                      >
                        <option value="linkedin">Linkedin</option>
                        <option value="skype">Skype</option>
                        <option value="facbook">Facebook</option>
                      </select>
                    </div>

                    <div class="col-md-4 form-group">
                      <input
                        type="text"
                        class="form-control"
                        v-model="userUpdate.communication"
                      />
                    </div>
                  </div>
                </div>

                <div class="text-end mt-3">
                  <button
                    type="button"
                    @click="PublisherAccountDataUpdate()"
                    class="btn btn-sm btn-primary py-2"
                    style="width: 150px"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </template>
            <template v-else-if="tabid == 'settings'">
              <form>
                <div class="card padding-standart3 p-5">
                  <h5 class="card-title-custom mb-2px pb-3">Security Settings</h5>

                  <div class="form-group row mb-0">
                    <label class="col-lg-4 col-form-label fullhd-width"
                      >Change Password</label
                    >
                    <div class="col-md-12 col-lg-7">
                      <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#changePasswordModal"
                        class="btn btn-outline-primary show-modal"
                        id="change-password-btn"
                        style="width: 180px"
                      >
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <form>
                <div class="row-mb card padding-standart3 p-5 mt-4">
                  <div class="row align-items-center">
                    <div class="col-6">
                      <label class="switch">
                        <input type="checkbox" @change="getToFactionStatus($event)" :checked="userTofactor.two_factor_status == 1"  id="togBtn"/>
                        <div class="slider round">
                          <span class="on">ON</span>
                          <span class="off">OFF</span>
                        </div> </label
                      >Two Factor Authentication
                    </div>
                    <template v-if="userTofactor.two_factor_status == 1">
                      <div class="col-6">
                        <label for="">Type Two Factor Authentication</label>
                        <select class="form-select" @change="twoFactorAuthType($event)">
                        <option value="">Select Two Factor Authentication</option>
                        <option value="google_authentication">Google Two Factor Authentication</option>
                        <option value="gmail_authentication">Gmail Two Factor Authentication</option>
                        </select>
                      </div>
                    </template>
                  </div>
                  <template v-if="twoFactorType != '' && twoFactorType == 'google_authentication'">
                    <div class="row  align-items-center">
                      <div class="col-12 text-center mb-3">
                        <div>
                          <img :src="qrCodeImage" alt="" > <br>
                          <p class="mb-0">Scan the QR To Get The Code</p>
                          <div class="d-flex justify-content-center align-items-center mt-2">
                            <div>
                              <input type="text" v-model="enablegoogle.code" placeholder="Input Code Here To Enable The Option..." class="form-control w-40">
                              <p v-if="validationErrors && validationErrors.code" class="text-danger"> 
                                    {{ validationErrors.code[0] }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-if="twoFactorType != '' && twoFactorType == 'google_authentication'">
                    <div class="form-group text-end mt-3">
                    <button type="button" @click="saveGoogleTwoFactor()" class="btn btn-sm btn-primary py-2">
                      <i class="fas fa-check fa-sm me-1"></i> Save Google
                    </button>
                  </div>
                  </template>
                  <!-- <div class="form-group text-end mt-3">
                    <button
                      type="button"
                      @click="updateToFatorData()"
                      class="btn btn-sm btn-primary py-2"
                    >
                      <i class="fas fa-check fa-sm me-1"></i> Save Change
                    </button>
                  </div> -->
                </div>
              </form>
            </template>
            <template v-else-if="tabid == 'payment_settings'">
              <form>
                <div class="card padding-standart3 p-5">
                  <div class="row form-group">
                    <label for="payment_type" class="required mb-1">Payment Type</label>
                    <select
                      v-model="paymentInfoCreate.payment_type"
                      @change="handlePaymentTypeChange($event)"
                      id="payment_type"
                      class="form-select"
                    >
                      <option value="">Select Please</option>
                      <option value="1">Payoneer</option>
                      <option value="2">Bank Draft</option>
                    </select>
                    <div
                      v-if="pvalidationErrors && pvalidationErrors.payment_type"
                      class="text-danger"
                    >
                      {{ pvalidationErrors.payment_type[0] }}
                    </div>
                  </div>

                  <div id="payoneer" class="d-none mt-3">
                    <div class="row form-group">
                      <label for="email_address" class="required mb-1"
                        >Add Your Payoneer Associated Email Address</label
                      >
                      <input
                        type="email"
                        v-model="paymentInfoCreate.email_address"
                        id="email_address"
                        required
                        class="form-control"
                        placeholder="Enter Add Your Payoneer Associated Email Address</label
                      >"
                      />
                      <div
                        v-if="pvalidationErrors && pvalidationErrors.email_address"
                        class="text-danger"
                      >
                        {{ pvalidationErrors.email_address[0] }}
                      </div>
                    </div>
                  </div>

                  <div id="bank" class="d-none mt-3">
                    <div class="row form-group">
                      <label for="bank_location" class="required mb-1"
                        >Bank Location</label
                      >
                      <select
                        v-model="paymentInfoCreate.bank_location"
                        id="bank_location"
                        class="form-select"
                        required
                      >
                        <Country></Country>
                      </select>
                      <div
                        v-if="pvalidationErrors && pvalidationErrors.bank_location"
                        class="text-danger"
                      >
                        {{ pvalidationErrors.bank_location[0] }}
                      </div>
                    </div>

                    <!-- Country form  -->
                    <div id="country"></div>
                  </div>
                </div>

                <div class="text-end mt-3">
                  <button
                    type="button"
                    @click="updatePaymnetInfoData()"
                    class="btn btn-primary mb-2 py-2"
                    style="width: 180px"
                  >
                    Save
                  </button>
                </div>
              </form>
              <div class="d-none" id="all-Country-Option">
                <CountryOption></CountryOption>
              </div>
              <!--  Payment Information Show  -->
              <div class="row">
                <div class="col-md-12">
                  <div class="card mt-2 p-0">
                    <div class="card-header py-2">
                      <div>
                        <h5 class="card-title mb-0 mt-2">Payment Settings</h5>
                      </div>
                    </div>

                    <div class="card-body px-4">
                      <table
                        class="table mt-2 align-middle mb-0 table table-hover"
                        id="payment_datatables"
                      >
                        <thead>
                          <tr>
                            <th>SL</th>
                            <th>Payment Type</th>
                            <th>Name</th>
                            <th>Email Address</th>
                            <th>Phone Number</th>
                            <th>Bank Name</th>
                            <th>Account Number</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <template v-if="getPaymentDatas != null">
                            <tr v-for="(data, index) in getPaymentDatas" :key="index">
                              <td>{{ index + 1 }}</td>
                              <td v-if="data.payment_type == 1">{{ "Payoneer" }}</td>
                              <td v-else>{{ "Bank Draft" }}</td>
                              <td>{{ data.account_holder_name }}</td>
                              <td>{{ data.email_address }}</td>
                              <td>{{ data.phone_number }}</td>
                              <td>{{ data.bank_name }}</td>
                              <td>{{ data.account_number }}</td>
                              <td v-if="data.status == 1">
                                <span class="badge badge-sm bg-success">Approved</span>
                              </td>
                              <td v-else>
                                <span class="badge badge-sm bg-danger">Pending</span>
                              </td>
                              <td>
                                <div class="dropdown mr-1">
                                  <button
                                    aria-expanded="false"
                                    aria-haspopup="true"
                                    title="Offer Action"
                                    class="border-0 action-btn"
                                    data-bs-toggle="dropdown"
                                    id="dropdownMenuButton"
                                    type="button"
                                  >
                                    <i
                                      class="fa-solid fa-ellipsis-vertical text-dark"
                                    ></i>
                                  </button>
                                  <div class="dropdown-menu tx-13">
                                    <button
                                      data-bs-toggle="modal"
                                      data-bs-target="#paymentInfoModal"
                                      class="dropdown-item duplicate-item"
                                      @click="showPaymnetInfoData(data.id)"
                                    >
                                      <i class="fa-regular fa-eye me-1 text-info"></i>View
                                    </button>
                                    <button
                                      class="dropdown-item offer-view"
                                      @click="paymentInfoDelete(data.id)"
                                    >
                                      <i class="fa-solid fa-trash me-1 text-danger"></i
                                      >Delete
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </template>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template v-else-if="tabid == 'ringba_aaccount'">
              <div class="card padding-standart3 p-5">
                <div class="card-title-custom mb-24px pb-3">Ringba Account</div>
                <div>
                  <a
                    href="https://app.ringba.com/#/login"
                    target="_blank"
                    class="btn btn-success me-2"
                    ><i class="fas fa-sign-in-alt me-1"></i> Login</a
                  >
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#ringbaModal"
                  >
                    <i class="fas fa-user-plus me-1"></i>
                    Sign Up
                  </button>
                </div>
              </div>
            </template>
            <template v-else-if="tabid == 'my_account_manager'">
              <div class="card">
                <div class="card-body">
                  <template v-if="accountManager && accountManager.account_manager">
                    <div class="row align-items-center">
                      <div class="col-md-3">
                        <div class="text-center">
                          <div class="">
                            <template
                              v-if="accountManager.account_manager.avatar != null"
                            >
                              <img
                                class="card-img-top"
                                style="width: 150px; border-radius: 50%"
                                :src="
                                  globalVariables.appUrl +
                                  accountManager.account_manager.avatar
                                "
                                alt="image"
                              />
                            </template>
                            <template v-else>
                              <img
                                class="card-img-top"
                                style="width: 150px; border-radius: 50%"
                                :src="
                                  globalVariables.appUrl + 'backend/images/no-image.png'
                                "
                                alt="image"
                              />
                            </template>
                          </div>
                          <h4 class="card-title mt-3">
                            {{ accountManager.account_manager.fname }}
                            {{ accountManager.account_manager.lname }}
                          </h4>
                        </div>
                      </div>
                      <div class="col-md-9">
                        <ul class="advertiser-info text-left">
                          <template v-if="accountManager.account_manager.phone_no">
                            <li class="mt-2">
                              <i class="fas fa-phone-alt"></i>
                              {{ accountManager.account_manager.phone_no }}
                            </li>
                          </template>

                          <template v-if="accountManager.account_manager.email">
                            <li class="mt-2">
                              <i class="fas fa-envelope"></i>
                              {{ accountManager.account_manager.email }}
                            </li>
                          </template>

                          <template v-if="accountManager.account_manager.skype">
                            <li class="mt-2">
                              <i class="fab fa-skype"></i>
                              {{ accountManager.account_manager.skype }}
                            </li>
                          </template>

                          <template v-if="accountManager.account_manager.telegram">
                            <li class="mt-2">
                              <i class="fab fa-telegram-plane"></i>
                              {{ accountManager.account_manager.telegram }}
                            </li>
                          </template>

                          <template v-if="accountManager.account_manager.facebook">
                            <li class="mt-2">
                              <i class="fab fa-facebook-f"></i>
                              {{ accountManager.account_manager.facebook }}
                            </li>
                          </template>

                          <template v-if="accountManager.account_manager.available_time">
                            <li class="mt-2">
                              <i class="far fa-clock"></i>
                              {{ accountManager.account_manager.available_time }}
                            </li>
                          </template>
                        </ul>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <span class="text-danger py-5">No Account Manager Set</span>
                  </template>
                </div>
              </div>
            </template>
            <template v-else-if="tabid == 'payment_history'">
              <div class="card">
                <div class="card-header py-2">
                  <h5 class="card-title mt-2 mb-0">Payment History</h5>
                </div>
                <div class="card-body px-4 pt-1 table-responsive table-overflow-hidden">
                  <table class="table">
                    <thead>
                      <th>SL</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Paid</th>
                      <th>Due Amount</th>
                      <th>Balance</th>
                      <th>Payment Status</th>
                      <th>Action</th>
                    </thead>
                    <tbody>
                      <tr v-for="(history, index) in paymentHistory" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ history.user.fname + " " + history.user.lname }}</td>
                        <td>{{ history.user.email }}</td>
                        <td>{{ formatDate(history.created_at) }}</td>
                        <td>{{ history.description || "--" }}</td>
                        <td>{{ history.deposit || "0.00" }}</td>
                        <td>{{ history.withdraw || "0.00" }}</td>
                        <td>{{ history.balance || "0.00" }}</td>
                        <td>
                          <span
                            :class="{
                              'badge-success': history.status === 'Paid',
                              'badge-danger': history.status !== 'Paid',
                            }"
                            >{{ history.status }}</span
                          >
                        </td>
                        <td>
                          <RouterLink
                            :to="'/publisher-payment-history/details/' + history.id"
                            target="_blank"
                            class="rounded-circle btn-style-info"
                            ><i class="fas fa-eye"></i
                          ></RouterLink>
                        </td>
                      </tr>
                      <tr v-if="paymentHistory && paymentHistory.length === 0">
                        <td colspan="10" class="text-danger text-center">
                          No data found!
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="4"></td>
                        <td>Total Paid = {{ totalPaidAmount }}</td>
                        <td>Total Pending = {{ totalPendingAmount }}</td>
                        <td colspan="3"></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </template>
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
    <!-- / Content -->

    <div class="modal fade" id="ringbaModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel3">Ringba Account</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            To create your Ringba account and gain access, please reach out to your
            Affiliate Manager or send an email to us at info@doppcall.com
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-label-secondary btn-sm"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="changePasswordModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel3">Change Password Modal</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div>
              <div class="row g-5">
                <div class="col-sm-3">
                  <label for="current_password" class="required">Current Password</label>
                </div>
                <div class="col-sm-9">
                  <input
                    type="password"
                    v-model="passwordUpdate.current_password"
                    id="current_password"
                    class="form-control"
                    placeholder="Enter Current Password"
                  />
                  <div
                    v-if="validationErrors && validationErrors.current_password"
                    class="text-danger"
                  >
                    {{ validationErrors.current_password[0] }}
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-3">
              <div class="row g-5">
                <div class="col-sm-3">
                  <label for="new_password" class="required">New Password</label>
                </div>
                <div class="col-sm-9">
                  <input
                    type="password"
                    v-model="passwordUpdate.new_password"
                    id="new_password"
                    class="form-control"
                    placeholder="Enter New Password"
                  />
                  <div
                    v-if="validationErrors && validationErrors.new_password"
                    class="text-danger"
                  >
                    {{ validationErrors.new_password[0] }}
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-3">
              <div class="row g-5">
                <div class="col-sm-3">
                  <label for="confirm_password" class="required">Confrim Password</label>
                </div>
                <div class="col-sm-9">
                  <input
                    type="password"
                    v-model="passwordUpdate.confirm_password"
                    id="confirm_password"
                    class="form-control"
                    placeholder="Enter Confrim Password"
                  />
                  <div
                    v-if="validationErrors && validationErrors.confirm_password"
                    class="text-danger"
                  >
                    {{ validationErrors.confirm_password[0] }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-label-secondary btn-sm"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              @click="PublisherPasswordUpdate()"
              class="btn btn-primary btn-sm"
            >
              <i class="fas fa-check fa-sm me-1"></i> Confirm
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="paymentInfoModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel3">
              Payment Setting Information
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="card card-body border-0 p-0">
              <table class="table table-sm table-hover table-bordered">
                <tr style="line-height: 40px">
                  <td class="font-weight-bold ps-4">Account Holder Name :</td>
                  <td id="account_holder_name_show"></td>
                </tr>
                <tr style="line-height: 40px">
                  <td class="font-weight-bold ps-4">Phone Number :</td>
                  <td id="phone_number_show"></td>
                </tr>
                <tr style="line-height: 40px">
                  <td class="font-weight-bold ps-4">Email :</td>
                  <td id="email_address_show"></td>
                </tr>
                <tr style="line-height: 40px">
                  <td class="font-weight-bold ps-4">Payment Type :</td>
                  <td id="payment_type_show"></td>
                </tr>
                <tr style="line-height: 40px">
                  <td class="font-weight-bold ps-4">Bank Location :</td>
                  <td id="bank_location_show"></td>
                </tr>
                <tr style="line-height: 40px">
                  <td class="font-weight-bold ps-4">Bank Account Type :</td>
                  <td id="bank_account_type_show"></td>
                </tr>
                <tr style="line-height: 40px">
                  <td class="font-weight-bold ps-4">Bank Name :</td>
                  <td id="bank_name_show"></td>
                </tr>
                <tr style="line-height: 40px">
                  <td class="font-weight-bold ps-4">Account Number :</td>
                  <td id="account_number_show"></td>
                </tr>
                <tr style="line-height: 40px">
                  <td class="font-weight-bold ps-4">Routing Number :</td>
                  <td id="routing_number_show"></td>
                </tr>
                <tr style="line-height: 40px">
                  <td class="font-weight-bold ps-4">Branch Number :</td>
                  <td id="branch_number_show"></td>
                </tr>
                <tr style="line-height: 40px">
                  <td class="font-weight-bold ps-4">IBAN Code :</td>
                  <td id="iban_code_show"></td>
                </tr>
                <tr style="line-height: 40px">
                  <td class="font-weight-bold ps-4">SWIFT/BIC Code :</td>
                  <td id="swift_bic_code_show"></td>
                </tr>
                <tr style="line-height: 40px">
                  <td class="font-weight-bold ps-4">IFSC Code :</td>
                  <td id="ifsc_code_show"></td>
                </tr>
                <tr style="line-height: 40px">
                  <td class="font-weight-bold ps-4">Account Type :</td>
                  <td id="account_type_show"></td>
                </tr>
                <tr style="line-height: 40px">
                  <td class="font-weight-bold ps-4">Address :</td>
                  <td id="address_show"></td>
                </tr>
                <tr style="line-height: 40px">
                  <td class="font-weight-bold ps-4">City :</td>
                  <td id="city_show"></td>
                </tr>
                <tr style="line-height: 40px">
                  <td class="font-weight-bold ps-4">State :</td>
                  <td id="state_show"></td>
                </tr>
                <tr style="line-height: 40px">
                  <td class="font-weight-bold ps-4">Zip Code :</td>
                  <td id="zip_code_show"></td>
                </tr>
                <tr style="line-height: 40px">
                  <td class="font-weight-bold ps-4">Country :</td>
                  <td id="country_show"></td>
                </tr>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-label-secondary btn-sm"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Content wrapper -->
</template>

<script>
import QRCode from 'qrcode';
import axios from "axios";
import toastr from "toastr";
import Swal from "sweetalert2";
import "toastr/build/toastr.min.css";
import Loader from "../../../../../../include/loader.vue";
import Breadcrumb from "../../../../../../include/breadcrumb.vue";
import Country from "../../../../../../include/Country_option_payment.vue";
import CountryOption from "../../../../../../include/Country-option.vue";
import moment from "moment";
import bannnerImage from "../../../../../../../../../assets/image/profile-banner.png";
import { inject } from "vue";
import { fetchUserRolePublisher } from "@/services/userServicePublisher";

export default {
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
  components: {
    Loader,
    Breadcrumb,
    Country,
    CountryOption,
  },
  data() {
    return {
      breadcrumbs: [
        { label: "Dashboard", url: "/publisher/dashboard" },
        { label: "Account", url: "" },
      ],
      userData: "",
      bannnerImage,
      getLoader: false,
      showModal: false,
      showPaymentModal: false,
      showRingbaModal: false,
      rules: "",
      tabid: "my_profile",
      userUpdate: {
        email: "",
        phone: "",
        first_name: "",
        last_name: "",
        type: "",
        communication_type: "",
        communication: "",
        avatar: "",
      },
      userAddress: "",
      userShowImage: {
        avatar: "",
      },
      enablegoogle: {
        code: "",
      },
      passwordUpdate: {
        current_password: "",
        new_password: "",
        confirm_password: "",
      },
      userTofactor: {
        two_factor_status: "",
      },
      validationErrors: null,
      pvalidationErrors: null,
      paymentInfoCreate: {
        payment_type: "",
        bank_location: "",
        bank_account_type: "",
        bank_name: "",
        account_holder_name: "",
        account_number: "",
        routing_number: "",
        branch_number: "",
        iban_code: "",
        swift_bic_code: "",
        ifsc_code: "",
        account_type: "",
        phone_number: "",
        email_address: "",
        address: "",
        city: "",
        state: "",
        zip_code: "",
        country: "",
      },
      getPaymentDatas: "",
      deletePayment: {
        data: "",
      },
      showPaymentInfor: {
        id: "",
      },
      accountManager: "",
      paymentHistory: "",
      totalPaidAmount: 0,
      totalPendingAmount: 0,
      qrCodeUrl: '' ,
      qrCodeImage : '',
      twoFactorType : "",
    };
  },
  async mounted() {
    try {
      const { role, isAuthorized } = await fetchUserRolePublisher();
      if (role == "Publisher") {
        if (this.$route.params.id === "user") {
          if (!localStorage.getItem("reloadCount")) {
            localStorage.setItem("reloadCount", 0);
          }
          this.reloadCount = parseInt(localStorage.getItem("reloadCount"));

          if (this.reloadCount === 0) {
            localStorage.setItem("reloadCount", 1);
            location.reload(true);
          } else {
            this.getPublisherAccountData();
            this.getPublisherPaymnetInfo();
            this.getPublisherAccountManager();
            this.getPublisherDeposite();
            localStorage.setItem("reloadCount", 0);
          }
        } else {
          this.getPublisherAccountData();
          this.getPublisherPaymnetInfo();
          this.getPublisherAccountManager();
          this.getPublisherDeposite();
        }
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  },
  methods: {
    getPublisherAccountData() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl + "publisher/my-account", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if (res && res.data && res.data.user && res.data.user.avatar != null) {
            this.userShowImage.avatar =
              this.globalVariables.appUrl + res.data.user.avatar;
          } else {
            this.userShowImage.avatar =
              this.globalVariables.appUrl + "backend/images/no-image.png";
          }
          this.userData = res.data.user;
          this.userUpdate.email = res.data.user.email;
          this.userUpdate.phone = res.data.user.phone_no;
          this.userUpdate.first_name = res.data.user.fname;
          this.userUpdate.last_name = res.data.user.lname;
          this.userUpdate.type = res.data.user.type;
          this.userUpdate.userAddress = res.data.user.user_address;
          if (res.data.user.user_address.linkedin_id != null) {
            this.userUpdate.communication_type = "linkedin";
            this.userUpdate.communication = res.data.user.user_address.linkedin_id;
          } else if (res.data.user.user_address.skype_id != null) {
            this.userUpdate.communication_type = "skype";
            this.userUpdate.communication = res.data.user.user_address.skype_id;
          } else {
            this.userUpdate.communication_type = "facbook";
            this.userUpdate.communication = res.data.user.user_address.facebook_id;
          }
          this.userTofactor.two_factor_status = res.data.user.two_factor_status;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    getPublisherPaymnetInfo() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl + "publisher/payment/settings/get-data", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.getPaymentDatas = res.data.getData;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    getPublisherAccountManager() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl + "publisher/profile/account-manager", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.accountManager = res && res.data && res.data.user;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    getPublisherDeposite() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl + "publisher/payment-history ", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.paymentHistory = res.data.paymentHistory;
          this.calculateTotals();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    },

    formatDates(date) {
      return moment(date).format("D MMMM YYYY");
    },

    calculateTotals() {
      this.totalPaidAmount = this.paymentHistory
        .reduce((total, value) => total + (value.deposit || 0), 0)
        .toFixed(2);
      this.totalPendingAmount = this.paymentHistory
        .reduce((total, value) => total + (value.withdraw || 0), 0)
        .toFixed(2);
    },

    paymentInfoDelete(id) {
      this.deletePayment.data = id;
      Swal.fire({
        text: "Are you sure to delete",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.value) {
          (this.getLoader = true),
            axios
              .post(
                this.globalVariables.apiUrl + "publisher/payment/settings/delete",
                this.deletePayment,
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              )
              .then((res) => {
                if (res.data.status == "success") {
                  toastr.success(res.data.message);
                  this.getPublisherAccountData();
                  this.getPublisherPaymnetInfo();
                }
              })
              .catch((error) => {
                if (error != null) {
                  toastr.error("User Not Found!");
                }
              })
              .finally(() => {
                this.getLoader = false;
              });
        }
      });
    },

    PublisherAccountDataUpdate() {
      this.getLoader = true;
      axios
        .post(this.globalVariables.apiUrl + "publisher/profile/update", this.userUpdate, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          toastr.success(res.data.message);
          this.getPublisherAccountData();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    PublisherPasswordUpdate() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl + "publisher/profile/password/update",
          this.passwordUpdate,
          {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          }
        )
        .then((res) => {
          if (res.data.status == "success") {
            toastr.success(res.data.message);
            this.logoutAction();
          } else if (res.data.status == "error") {
            toastr.error(res.data.message);
          } else {
            this.validationErrors = res.data.errors;
          }
        })
        .catch((error) => {
          if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            this.validationErrors = error.response.data.errors;
          }
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    updateToFatorData() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl + "publisher/twofactor/update",
          this.userTofactor,
          {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          }
        )
        .then((res) => {
          if (res.data.status == "success") {
            console.log(res);
            toastr.success(res.data.message);
            this.getPublisherAccountData();
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    twoFactorAuthType(event){
      var getValue = event.target.value;
      if(getValue != null && getValue != ''){
        if(getValue == 'google_authentication'){
          this.getLoader = true;
          this.twoFactorType = 'google_authentication';
          axios
            .get(
              this.globalVariables.apiUrl + "google/twofactor/resend",
              {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") },
              }
            )
            .then((res) => {
              if (res.status == 200) {
                this.qrCodeUrl = res.data.qr_code_url;
                this.getQrCode()
              }
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              this.getLoader = false;
            });
        }
      }
    },
    
    saveGoogleTwoFactor(){
      if(this.enablegoogle.code != ''){
        axios
          .post(
            this.globalVariables.apiUrl + "google/twofactor/store",this.enablegoogle,
            {
              headers: { Authorization: "Bearer " + localStorage.getItem("token") },
            }
          )
          .then((res) => {
            if(res.data.status == 'success'){
              this.enablegoogle.code = '';
              toastr.sucess(res.data.message);
            }else{
              toastr.error(res.data.message);
            }
          })
          .catch((error) => {
            if (error.response && error.response.data && error.response.data.errors) {
             this.validationErrors = error.response.data.errors;
            }
          })
          .finally(() => {
            this.getLoader = false;
          });
      }else{
        toastr.error("This Code Field is Required !");
      }
    },

    getQrCode(){
      QRCode.toDataURL(this.qrCodeUrl)
      .then((url) => {
        this.qrCodeImage = url;
      })
      .catch((err) => {
        console.error(err);
      });
    },

    updatePaymnetInfoData() {
      this.getLoader = true;

      var email_address = $("#email_address").val();
      var email = $("#el_email_address").val();
      var un_email_address = $("#un_email_address").val();
      var ca_email_address = $("#ca_email_address").val();
      var ba_email_address = $("#ba_email_address").val();
      var in_email_address = $("#in_email_address").val();
      var uk_email_address = $("#uk_email_address").val();
      var pk_email_address = $("#pk_email_address").val();

      if (email_address !== "") {
        this.paymentInfoCreate.email_address = email_address;
      } else if (email !== "") {
        this.paymentInfoCreate.email_address = email;
      } else if (un_email_address !== "") {
        this.paymentInfoCreate.email_address = un_email_address;
      } else if (ca_email_address !== "") {
        this.paymentInfoCreate.email_address = ca_email_address;
      } else if (ba_email_address !== "") {
        this.paymentInfoCreate.email_address = ba_email_address;
      } else if (in_email_address !== "") {
        this.paymentInfoCreate.email_address = in_email_address;
      } else if (uk_email_address !== "") {
        this.paymentInfoCreate.email_address = uk_email_address;
      } else if (pk_email_address !== "") {
        this.paymentInfoCreate.email_address = pk_email_address;
      }

      this.paymentInfoCreate.bank_account_type = $("#bank_account_type").val();
      this.paymentInfoCreate.bank_name = $("#bank_name").val();
      this.paymentInfoCreate.account_holder_name = $("#account_holder_name").val();
      this.paymentInfoCreate.account_number = $("#account_number").val();
      this.paymentInfoCreate.routing_number = $("#routing_number").val();
      this.paymentInfoCreate.branch_number = $("#branch_number").val();
      this.paymentInfoCreate.iban_code = $("#iban_code").val();
      this.paymentInfoCreate.swift_bic_code = $("#swift_bic_code").val();
      this.paymentInfoCreate.ifsc_code = $("#ifsc_code").val();
      this.paymentInfoCreate.account_type = $("#account_type").val();
      this.paymentInfoCreate.phone_number = $("#phone_number").val();
      this.paymentInfoCreate.city = $("#city").val();
      this.paymentInfoCreate.state = $("#state").val();
      this.paymentInfoCreate.zip_code = $("#zip_code").val();
      this.paymentInfoCreate.country = $("#countryOption").val();
      this.paymentInfoCreate.address = $("#address").val();
      axios
        .post(
          this.globalVariables.apiUrl + "publisher/payment/settings/store",
          this.paymentInfoCreate,
          {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.data.status == "success") {
            toastr.success(res.data.message);
            this.getPublisherPaymnetInfo();
          }
        })
        .catch((error) => {
          if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            this.pvalidationErrors = error.response.data.errors;
          }
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    showPaymnetInfoData(id) {
      this.showPaymentInfor.id = id;
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl + "publisher/payment/settings/show",
          this.showPaymentInfor,
          {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          }
        )
        .then((res) => {
          document.querySelector("#account_holder_name_show").innerHTML =
            res.data.account_holder_name ?? "";
          document.querySelector("#phone_number_show").innerHTML =
            res.data.phone_number ?? "";
          document.querySelector("#email_address_show").innerHTML =
            res.data.email_address ?? "";
          if (res.data.payment_type == 1) {
            document.querySelector("#payment_type_show").innerHTML = "Payoneer";
          } else {
            document.querySelector("#payment_type_show").innerHTML = "Bank Draft";
          }
          document.querySelector("#bank_location_show").innerHTML =
            res.data.bank_location ?? "";
          document.querySelector("#bank_account_type_show").innerHTML =
            res.data.bank_account_type ?? "";
          document.querySelector("#bank_name_show").innerHTML = res.data.bank_name ?? "";
          document.querySelector("#account_number_show").innerHTML =
            res.data.account_number ?? "";
          document.querySelector("#routing_number_show").innerHTML =
            res.data.routing_number ?? "";
          document.querySelector("#branch_number_show").innerHTML =
            res.data.branch_number ?? "";
          document.querySelector("#iban_code_show").innerHTML = res.data.iban_code ?? "";
          document.querySelector("#swift_bic_code_show").innerHTML =
            res.data.swift_bic_code ?? "";
          document.querySelector("#ifsc_code_show").innerHTML = res.data.ifsc_code ?? "";
          document.querySelector("#account_type_show").innerHTML =
            res.data.account_type ?? "";
          document.querySelector("#address_show").innerHTML = res.data.address ?? "";
          document.querySelector("#city_show").innerHTML = res.data.city ?? "";
          document.querySelector("#state_show").innerHTML = res.data.state ?? "";
          document.querySelector("#zip_code_show").innerHTML = res.data.zip_code ?? "";
          document.querySelector("#country_show").innerHTML = res.data.country ?? "";
        })
        .catch((error) => {
          if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            this.pvalidationErrors = error.response.data.errors;
          }
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    handlePaymentTypeChange(event) {
      if (event.target.value === "1") {
        document.getElementById("payoneer").classList.remove("d-none");
        document.getElementById("bank").classList.add("d-none");
      } else if (event.target.value === "2") {
        document.getElementById("payoneer").classList.add("d-none");
        document.getElementById("bank").classList.remove("d-none");

        this.initializePhoneInput();
      }
    },

    initializePhoneInput() {
      $(document).on("change", "#bank_location", () => {
        if (
          $("#bank_location").val() === "United States of America" ||
          $("#bank_location").val() === "Puerto Rico"
        ) {
          $("#country").empty();
          $("#country").html(
            `<div class="row g-5">
              <div class="col-md-6">
                  <div class="row form-group pr-md-3 mt-3">
                    <label for="bank_account_type" class="required mb-1">Bank Account Type</label>
                    <select class="form-select"  id="bank_account_type" required>
                        <option value="Business Account">Business Account</option>
                        <option value="Personal Account">Personal Account</option>
                      </select>
                   </div>
                   </div>
              </div>
              <div class="col-md-6">
                  <div class="row form-group mt-3">
                    <label for="bank_name" class="required mb-1">Bank Name</label>
                    <input type="text" id="bank_name" class="form-control" required placeholder="Enter Bank Name"/>
                  </div>
              </div>
              </div>
              <div class="row g-5">
              <div class="col-md-6">
                  <div class="row form-group pr-md-3 mt-3">
                    <label for="account_holder_name" class="required mb-1">Account Holder Name</label>
                    <input type="text"id="account_holder_name" class="form-control" required placeholder="Enter Account Holder Name"/>
                  </div>
              </div>
              <div class="col-md-6">
                  <div class="row form-group mt-3">
                    <label for="account_number" class="required mb-1">Account Number</label>
                    <input type="text"  id="account_number" class="form-control" required placeholder="Enter Account Number"/>
                  </div>
              </div>
              </div>
              <div class="row g-5">
              <div class="col-md-6">
                  <div class="row form-group pr-md-3 mt-3">
                    <label for="routing_number" class="required mb-1">Routing Number</label>
                    <input type="text" id="routing_number" class="form-control" required placeholder="Enter Routing Number"/>
                  </div>
              </div>
              <div class="col-md-6">
                  <div class="row form-group mt-3">
                    <label for="account_type" class="required mb-1">Account Type</label>
                    <select class="form-select"  id="account_type" required>
                       <option value="C- Checking Account">C- Checking Account</option>
                       <option value="S- Savings Account">S- Savings Account</option>
                    </select>
                  </div>
              </div>
              </div>
               <div class="row g-5">
              <div class="col-md-6 px-2" style="margin-top: 62px !important">
                  <label for="phone_number" class="required mb-1">Phone Number</label> </br>
                  <input id="phone_number" class="phone_number form-control"  type="tel" required placeholder="Enter Phone Number">
                  </div>
              <div class="col-md-6">
                  <div class="row form-group mt-3">
                    <label for="email_address" class="required mb-1">Email Address</label>
                    <input type="email"  id="un_email_address" class="form-control" required placeholder="Enter Email Address"/>
                  </div>
              </div>
              </div>
              <div class="row g-5">
              <div class="col-md-6">
                  <div class="row form-group pr-md-3 mt-3">
                    <label for="city" class="required mb-1">City</label>
                    <input type="text"  id="city" class="form-control" required placeholder="Enter City"/>
                  </div>
              </div>
              <div class="col-md-6">
                  <div class="row form-group mt-3">
                    <label for="state" class="required mb-1">State</label>
                    <input type="text"  id="state" class="form-control" required placeholder="Enter State"/>
                  </div>
              </div>
              </div>
              <div class="row g-5">
              <div class="col-md-6">
                  <div class="row form-group pr-md-3 mt-3">
                    <label for="zip_code" class="required mb-1">Zip Code</label>
                    <input type="text"  id="zip_code" class="form-control" required placeholder="Enter Zip Code"/>
                  </div>
              </div>
              <div class="col-md-6">
                  <div class="row form-group mt-3">
                    <label for="country" class="required mb-1">Country</label>
                    <select class="form-select" id="countryOption" required>

                    </select>
                  </div>
              </div>
              </div>
              <div class="row g-5">
              <div class="col-md-6">
                  <div class="row form-group pr-md-3 mt-3">
                    <label for="address" class="required">Address</label>
                    <textarea id="address" required class="form-control"></textarea>
                  </div>
              </div>
              </div>
          </div>`
          );

          var CountryOption = document.querySelector("#all-Country-Option");
          var ShoCountryOption = document.querySelector("#countryOption");
          ShoCountryOption.innerHTML = CountryOption.innerHTML;

          // Initialize intlTelInput
          var input = document.querySelector("#phone_number");
          window.intlTelInput(input, {});

          // Handle flag container click
          $(".iti__flag-container").click(() => {
            var countryCode = $(".iti__selected-flag")
              .attr("title")
              .replace(/[^0-9]/g, "");
            input.value = countryCode + input.value;
          });
        } else if ($("#bank_location").val() == "Canada") {
          $("#country").empty();
          $("#country").html(
            `<div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="bank_account_type" class="required mb-1">Bank Account Type</label>
                          <select class="form-select"  id="bank_account_type" required>
                              <option value="Business Account">Business Account</option>
                              <option value="Personal Account">Personal Account</option>
                          </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="bank_name" class="required mb-1">Bank Name</label>
                          <input type="text"  id="bank_name" class="form-control" required placeholder="Enter Bank Name"/>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="account_holder_name" class="required mb-1">Account Holder Name</label>
                          <input type="text"  id="account_holder_name" class="form-control" required placeholder="Enter Account Holder Name"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="account_number" class="required mb-1">Account Number</label>
                          <input type="text"  id="account_number" class="form-control" required placeholder="Enter Account Number"/>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="branch_number" class="required mb-1">Branch Number</label>
                          <input type="text" id="branch_number" class="form-control" required placeholder="Enter Branch Number"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="account_type" class="required mb-1">Account Type</label>
                          <select class="form-select"  id="account_type" required>
                            <option value="C- Checking Account">C- Checking Account</option>
                            <option value="S- Savings Account">S- Savings Account</option>
                          </select>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6 px-2" style="margin-top: 62px">
                        <label for="phone_number" class="required mb-1">Phone Number</label></br>
                        <input id="phone_number" class="phone_number"  type="tel" placeholder="Enter Phone Number"> 
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="email_address" class="required mb-1">Email Address</label>
                          <input type="email"  id="ca_email_address" class="form-control" required placeholder="Enter Email Address"/>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="city" class="required mb-1">City</label>
                          <input type="text"  id="city" class="form-control" required placeholder="Enter City"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="state" class="required mb-1">State</label>
                          <input type="text"  id="state" class="form-control" required placeholder="Enter Email State"/>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="zip_code" class="required mb-1">Zip Code</label>
                          <input type="text"  id="zip_code" class="form-control" required placeholder="Enter Zip Code"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="country" class="required mb-1">Country</label>
                          <select class="form-select" id="countryOption" required>
                            <CountryOption></CountryOption>
                          </select>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="address" class="required mb-1">Address</label>
                          <textarea id="address" required class="form-control" placeholder="Enter Address"></textarea>
                        </div>
                    </div>
                    </div>
                </div>`
          );

          var CountryOption = document.querySelector("#all-Country-Option");
          var ShoCountryOption = document.querySelector("#countryOption");
          ShoCountryOption.innerHTML = CountryOption.innerHTML;
          // canada
          var input = document.querySelector("#phone_number");
          window.intlTelInput(input, {});

          // Handle flag container click
          $(".iti__flag-container").click(() => {
            var countryCode = $(".iti__selected-flag")
              .attr("title")
              .replace(/[^0-9]/g, "");
            input.val = "";
            input.value = countryCode + input.value;
          });
        } else if (
          $("#bank_location").val() == "Australia" ||
          $("#bank_location").val() == "Phillipines" ||
          $("#bank_location").val() == "Bangladesh"
        ) {
          $("#country").empty();
          $("#country").html(
            `<div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="bank_account_type" class="required mb-1">Bank Account Type</label>
                          <select class="form-select"  id="bank_account_type" required>
                              <option value="Business Account">Business Account</option>
                              <option value="Personal Account">Personal Account</option>
                          </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="bank_name" class="required mb-1">Bank Name</label>
                          <input type="text"  id="bank_name" class="form-control" required placeholder="Enter Bank Name"/>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="account_holder_name" class="required mb-1">Account Holder Name</label>
                          <input type="text"  id="account_holder_name" class="form-control" required placeholder="Enter Account Holder Name"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="account_number" class="required mb-1">Account Number</label>
                          <input type="text" id="account_number" class="form-control" required placeholder="Enter Account Number"/>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6 px-2" style="margin-top: 62px">
                        <label for="phone_number" class="required mb-1">Phone Number</label></br>
                        <input id="phone_number" class="phone_number" type="tel" placeholder="Enter Phone Number">
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="email_address" class="required mb-1">Email Address</label>
                          <input type="email"  id="ba_email_address" class="form-control" required placeholder="Enter Email Address"/>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="city" class="required mb-1">City</label>
                          <input type="text" id="city" class="form-control" required placeholder="Enter City"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="state" class="required mb-1">State</label>
                          <input type="text" id="state" class="form-control" required placeholder="Enter State"/>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="zip_code" class="required mb-1">Zip Code</label>
                          <input type="text" id="zip_code" class="form-control" required placeholder="Enter Zip Code"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="country" class="required mb-1">Country</label>
                          <select class="form-select" id="countryOption" required>
                            <CountryOption></CountryOption>
                          </select>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="address" class="required mb-1">Address</label>
                          <textarea  id="address" required class="form-control" placeholder="Enter Address"></textarea>
                        </div>
                    </div>
                    </div>
                </div>`
          );

          var CountryOption = document.querySelector("#all-Country-Option");
          var ShoCountryOption = document.querySelector("#countryOption");
          ShoCountryOption.innerHTML = CountryOption.innerHTML;

          // Bangladesh
          var input = document.querySelector("#phone_number");
          window.intlTelInput(input, {});

          // Handle flag container click
          $(".iti__flag-container").click(() => {
            var countryCode = $(".iti__selected-flag")
              .attr("title")
              .replace(/[^0-9]/g, "");
            input.val = "";
            input.value = countryCode + input.value;
          });
        } else if ($("#bank_location").val() == "India") {
          $("#country").empty();
          $("#country").html(`
                <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="bank_account_type" class="required mb-1">Bank Account Type</label>
                          <select class="form-select" id="bank_account_type" required>
                              <option value="Business Account">Business Account</option>
                              <option value="Personal Account">Personal Account</option>
                          </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="bank_name" class="required mb-1">Bank Name</label>
                          <input type="text" id="bank_name" class="form-control" required placeholder="Enter Bank Name"/>
                        </div>
                    </div>
                    </div>
                     <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="account_holder_name" class="required mb-1">Account Holder Name</label>
                          <input type="text"  id="account_holder_name" class="form-control" required placeholder="Enter Account Holder Name"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="account_number" class="required mb-1">Account Number</label>
                          <input type="text"  id="account_number" class="form-control" required placeholder="Enter Account Number"/>
                        </div>
                    </div>
                    </div>
                     <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="swift_bic_code" class="required mb-1">SWIFT / BIC Number</label>
                          <input type="text" id="swift_bic_code" class="form-control"  placeholder="Enter SWIFT / BIC Number"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="ifsc_code" class="required mb-1">IFSC</label>
                          <input type="text"  id="ifsc_code" class="form-control"  placeholder="Enter IFSC"/>
                        </div>
                    </div>
                    </div>
                     <div class="row g-5">
                    <div class="col-md-6 px-2" style="margin-top: 62px">
                      <label for="phone_number" class="required mb-1">Phone Number</label></br>
                      <input id="phone_number"  class="phone_number" type="tel" placeholder="Enter Phone Number">
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="email_address" class="required mb-1">Email Address</label>
                          <input type="email"  id="in_email_address" class="form-control" required placeholder="Enter Email Address"/>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="city" class="required mb-1">City</label>
                          <input type="text"  id="city" class="form-control" required placeholder="Enter City"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="state" class="required mb-1">State</label>
                          <input type="text"  id="state" class="form-control" required placeholder="Enter State"/>
                        </div>
                    </div>
                    </div>
                     <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="zip_code" class="required mb-1">Zip Code</label>
                          <input type="text"  id="zip_code" class="form-control" required placeholder="Enter Zip Code"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="country" class="required mb-1">Country</label>
                          <select class="form-select"  id="countryOption" required>
                            <CountryOption></CountryOption>
                          </select>
                        </div>
                    </div>
                    </div>
                     <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="address" class="required mb-1">Address</label>
                          <textarea  id="address" required class="form-control" placeholder="Enter Address"></textarea>
                        </div>
                    </div>
                    </div>
                </div>
            `);

          var CountryOption = document.querySelector("#all-Country-Option");
          var ShoCountryOption = document.querySelector("#countryOption");
          ShoCountryOption.innerHTML = CountryOption.innerHTML;
          // India
          var input = document.querySelector("#phone_number");
          window.intlTelInput(input, {});

          // Handle flag container click
          $(".iti__flag-container").click(() => {
            var countryCode = $(".iti__selected-flag")
              .attr("title")
              .replace(/[^0-9]/g, "");
            input.val = "";
            input.value = countryCode + input.value;
          });
        } else if ($("#bank_location").val() == "United Kingdom") {
          $("#country").empty();
          $("#country").html(
            `<div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="bank_account_type" class="required mb-1">Bank Account Type</label>
                          <select class="form-select"  id="bank_account_type" required>
                              <option value="Business Account">Business Account</option>
                              <option value="Personal Account">Personal Account</option>
                          </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="bank_name" class="required mb-1">Bank Name</label>
                          <input type="text"  id="bank_name" class="form-control" required placeholder="Enter Bank Name"/>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="account_holder_name" class="required mb-1">Account Holder Name</label>
                          <input type="text" id="account_holder_name" class="form-control" required placeholder="Enter Account Holder Name"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="account_number" class="required mb-1">Account Number</label>
                          <input type="text"  id="account_number" class="form-control" required placeholder="Enter Account Number"/>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="swift_bic_code" class="required mb-1">SWIFT / BIC Number</label>
                          <input type="text"  id="swift_bic_code" class="form-control"  placeholder="Enter SWIFT / BIC Number"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="iban_code" class="required mb-1">IBAN Code</label>
                          <input  id="iban_code" class="form-control" required  placeholder="Enter IBAN Code"/>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6 px-2" style="margin-top: 62px">
                        <label for="phone_number" class="required mb-1">Phone Number</label></br>
                        <input id="phone_number" class="phone_number"  type="tel"  placeholder="Enter Phone Number">
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="email_address" class="required mb-1">Email Address</label>
                          <input type="email"  id="uk_email_address" class="form-control" required placeholder="Enter Email Address"/>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="city" class="required mb-1">City</label>
                          <input type="text"  id="city" class="form-control" required placeholder="Enter City"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="state" class="required mb-1">State</label>
                          <input type="text"  id="state" class="form-control" required placeholder="Enter State"/>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="zip_code" class="required mb-1">Zip Code</label>
                          <input type="text"  id="zip_code" class="form-control" required placeholder="Enter Zip Code"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="country" class="required mb-1">Country</label>
                          <select class="form-select"  id="countryOption" required>
                            <CountryOption></CountryOption>
                          </select>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="address" class="required mb-1">Address</label>
                          <textarea  id="address" required class="form-control" placeholder="Enter Address"></textarea>
                        </div>
                    </div>
                    </div>
                </div>`
          );

          var CountryOption = document.querySelector("#all-Country-Option");
          var ShoCountryOption = document.querySelector("#countryOption");
          ShoCountryOption.innerHTML = CountryOption.innerHTML;
          // United Kingdom
          var input = document.querySelector("#phone_number");
          window.intlTelInput(input, {});

          // Handle flag container click
          $(".iti__flag-container").click(() => {
            var countryCode = $(".iti__selected-flag")
              .attr("title")
              .replace(/[^0-9]/g, "");
            input.val = "";
            input.value = countryCode + input.value;
          });
        } else if ($("#bank_location").val() == "Pakistan") {
          $("#country").empty();
          $("#country").html(
            `<div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="bank_account_type" class="required mb-1">Bank Account Type</label>
                          <select class="form-select"  id="bank_account_type" required>
                              <option value="Business Account">Business Account</option>
                              <option value="Personal Account">Personal Account</option>
                          </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="bank_name" class="required mb-1">Bank Name</label>
                          <input type="text"  id="bank_name" class="form-control" required placeholder="Enter Bank Name"/>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="account_holder_name" class="required mb-1">Account Holder Name</label>
                          <input type="text"  id="account_holder_name" class="form-control" required placeholder="Enter Account Holder Name"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="account_number" class="required mb-1">Account Number</label>
                          <input type="text"  id="account_number" class="form-control" required placeholder="Enter Account Number"/>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="iban_code" class="required mb-1">IBAN Code</label>
                          <input  id="iban_code" class="form-control" required  placeholder="Enter IBAN Code"/>
                        </div>
                    </div>
                    <div class="col-md-6 px-2" style="margin-top: 62px">
                        <label for="phone_number" class="required mb-1">Phone Number</label></br>
                          <input id="phone_number" class="phone_number"  type="tel"  placeholder="Enter Phone Number">
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="email_address" class="required mb-1">Email Address</label>
                          <input type="email"  id="pk_email_address" class="form-control" required placeholder="Enter Address"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="city" class="required mb-1">City</label>
                          <input type="text"  id="city" class="form-control" required placeholder="Enter City"/>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="state" class="required mb-1">State</label>
                          <input type="text"  id="state" class="form-control" required placeholder="Enter State"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="zip_code" class="required mb-1">Zip Code</label>
                          <input type="text"  id="zip_code" class="form-control" required placeholder="Enter Zip Code"/>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="country" class="required mb-1">Country</label>
                          <select class="form-select" id="countryOption" required>
                            <CountryOption></CountryOption>
                          </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="address" class="required mb-1">Address</label>
                          <textarea  id="address" required class="form-control" placeholder="Enter Address"></textarea>
                        </div>
                    </div>
                    </div>
                </div>`
          );

          var CountryOption = document.querySelector("#all-Country-Option");
          var ShoCountryOption = document.querySelector("#countryOption");
          ShoCountryOption.innerHTML = CountryOption.innerHTML;
          // Pakistan
          var input = document.querySelector("#phone_number");
          window.intlTelInput(input, {});

          // Handle flag container click
          $(".iti__flag-container").click(() => {
            var countryCode = $(".iti__selected-flag")
              .attr("title")
              .replace(/[^0-9]/g, "");
            input.val = "";
            input.value = countryCode + input.value;
          });
        } else {
          $("#country").empty();
          $("#country").html(
            `<div class="row g-5">
                  <div class="col-md-6">
                      <div class="row form-group pr-md-3 mt-3">
                        <label for="bank_account_type" class="required mb-1">Bank Account Type</label>
                          <select class="form-select"  id="bank_account_type" required>
                              <option value="Business Account">Business Account</option>
                              <option value="Personal Account">Personal Account</option>
                          </select>
                      </div>
                  </div>
                  <div class="col-md-6">
                      <div class="row form-group mt-3">
                        <label for="bank_name" class="required mb-1">Bank Name</label>
                          <input type="text"  id="bank_name" class="form-control" required placeholder="Enter Bank Name"/>
                      </div>
                  </div>
                  </div>
                  <div class="row g-5">
                  <div class="col-md-6">
                      <div class="row form-group pr-md-3 mt-3">
                        <label for="account_holder_name" class="required mb-1">Account Holder Name</label>
                          <input type="text"  id="account_holder_name" class="form-control" required placeholder="Enter Account Holder Name"/>
                      </div>
                  </div>
                  <div class="col-md-6">
                      <div class="row form-group mt-3">
                        <label for="account_number" class="required mb-1">Account Number</label>
                          <input type="text"  id="account_number" class="form-control" required placeholder="Enter Account Number"/>
                      </div>
                  </div>
                  </div>
                  <div class="row g-5">
                  <div class="col-md-6">
                      <div class="row form-group pr-md-3 mt-3">
                        <label for="routing_number" class="required mb-1">Routing Number</label>
                        <input  id="routing_number" class="form-control"  required  placeholder="Enter Routing Number"/>
                      </div>
                  </div>
                  <div class="col-md-6">
                      <div class="row form-group mt-3">
                        <label for="swift_bic_code" class="required mb-1">SWIFT / BIC Number</label>
                          <input type="text"  id="swift_bic_code" class="form-control"  placeholder="Enter SWIFT / BIC Number"/>
                      </div>
                  </div>
                  </div>
                  <div class="row g-5">
                  <div class="col-md-6">
                      <div class="row form-group pr-md-3 mt-3">
                        <label for="iban_code" class="required mb-1">IBAN</label>
                        <input  id="iban_code" class="form-control" required  placeholder="Enter IBAN"/>
                      </div>
                  </div>
                  <div class="col-md-6 px-2" style="margin-top: 62px">
                      <label for="phone_number" class="required mb-1">Phone Number</label></br>
                          <input id="phone_number" class="phone_number"  type="tel" placeholder="Enter Phone Number">
                  </div>
                  </div>
                  <div class="row g-5">
                  <div class="col-md-6">
                      <div class="row form-group pr-md-3 mt-3">
                        <label for="email_address" class="required mb-1">Email Address</label>
                          <input type="email" id="el_email_address" class="form-control" required placeholder="Enter Email Address"/>
                      </div>
                  </div>
                  <div class="col-md-6">
                      <div class="row form-group mt-3">
                        <label for="city" class="required mb-1">City</label>
                          <input type="text"  id="city" class="form-control" required placeholder="Enter City"/>
                      </div>
                  </div>
                  </div>
                  <div class="row g-5">
                  <div class="col-md-6">
                      <div class="row form-group pr-md-3 mt-3">
                        <label for="state" class="required mb-1">State</label>
                          <input type="text"  id="state" class="form-control" required placeholder="Enter State"/>
                      </div>
                  </div>
                  <div class="col-md-6">
                      <div class="row form-group mt-3">
                        <label for="zip_code" class="required mb-1">Zip Code</label>
                          <input type="text"  id="zip_code" class="form-control" required placeholder="Enter Zip Code"/>
                      </div>
                  </div>
                  </div>
                  <div class="row g-5">
                  <div class="col-md-6">
                      <div class="row form-group pr-md-3 mt-3">
                        <label for="country" class="required mb-1">Country</label>
                          <select class="form-select"  id="countryOption" required>
                            <CountryOption></CountryOption>
                          </select>
                      </div>
                  </div>
                  <div class="col-md-6">
                      <div class="row form-group mt-3">
                        <label for="address" class="required mb-1">Address</label>
                          <textarea  id="address" required class="form-control" placeholder="Enter Address"></textarea>
                      </div>
                  </div>
                  </div>
              </div>`
          );

          var CountryOption = document.querySelector("#all-Country-Option");
          var ShoCountryOption = document.querySelector("#countryOption");
          ShoCountryOption.innerHTML = CountryOption.innerHTML;
          // Others
          var input = document.querySelector("#phone_number");
          window.intlTelInput(input, {});

          // Handle flag container click
          $(".iti__flag-container").click(() => {
            var countryCode = $(".iti__selected-flag")
              .attr("title")
              .replace(/[^0-9]/g, "");
            input.val = "";
            input.value = countryCode + input.value;
          });
        }
      });
    },

    logoutAction() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl + "logout",
          {},
          { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
        )
        .then((res) => {
          localStorage.setItem("token", "");
          localStorage.setItem("admin_Id", "");
          // window.location.href =`http://localhost:5173/?token=logout`;
          window.location.href = `https://doppcall.com/?token=logout`;
          toastr.success("Log out Successfull");
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    primaryLogo(event) {
      const file = event.target.files[0];
      this.userUpdate.avatar = file;
      if (!file || file.type.indexOf("image/") === -1) return;
      const reader = new FileReader();
      reader.onload = () => {
        this.userShowImage.avatar = reader.result;
      };
      reader.readAsDataURL(file);
    },

    changeAccountTab(data) {
      this.tabid = data;
    },

    getToFactionStatus(event) {
      this.userTofactor.two_factor_status = event.target.checked;
    },
  },
};
</script>
<style>
.user-profile-header-banner img {
  width: 100%;
  object-fit: cover;
  height: 250px;
}
#publishers_account .user-profile-img {
  width: 130px;
}
#tab_panels .active {
  background: #ff0089;
  border-radius: 4px;
  color: white !important;
}
li {
  list-style: none;
}
.mypaymentmodal {
  margin-top: 25rem;
}
.mytabs {
  width: 100% !important;
}
.nav-pills .nav-link.active {
  border-radius: 3px !important;
  background-color: #e4f4fd !important;
}

.profile-name .title i {
  list-style: none;
  height: 15px;
  width: 15px;
  line-height: 25px;
  color: rgb(176, 176, 187);
  border: 2px solid rgb(176, 176, 187);
}
.profile-nav-main i::before {
  padding: 10px;
}
.with-icon input {
  position: absolute;
}

.with-icon i {
  position: relative;
  left: -8%;
  top: 12px;
}
.with-datatable-icon input {
  position: absolute;
}

.with-datatable-icon i {
  position: relative;
  left: -10%;
  top: 10px;
}

.fs-1 {
  font-size: 24px;
}
.text-graw {
  color: rgb(177, 176, 176);
}
.fs-2 {
  font-size: 20px;
}
.fs-3 {
  font-size: 18px;
}
.fs-3 {
  font-size: 16px;
}
.fw-900 {
  font-family: 900;
}
.tabel-head i {
  list-style: none;
  height: 19px;
  width: 19px;
  line-height: 19px;
  color: rgb(176, 176, 187);
  border: 2px solid rgb(176, 176, 187);
}

#styled-checkbox-1 {
  height: 18px;
  width: 20px;
  line-height: 10px;
  padding-left: 10px;
}

.popup-info-box {
  border-left: 6px solid #1e88e5;
  background: #e4f4fd;
  padding: 1.25rem;
  margin: 1.25rem;
}
.card-header {
  border-bottom: 2px solid rgb(192, 192, 192);
}

.rounded-circle-img {
  width: 120px !important;
  height: 120px !important;
  border-radius: 50% !important;
}
.choose-image-btn {
  background: #d8d8d8;
  color: black !important;
  padding: 3px 15px;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
}
.custom-nav-link {
  justify-content: start !important;
  font-size: 15px !important;
}

#publisher_image .avatar-upload {
  position: relative;
  max-width: 205px;
  display: flex;
}

#publisher_image .avatar-upload .avatar-edit {
  position: absolute;
  right: 55px;
  z-index: 1;
  top: 10px;
}

#publisher_image .avatar-upload .avatar-edit input {
  display: none;
}

#publisher_image .avatar-upload .avatar-edit input + label {
  display: inline-block;
  width: 34px;
  height: 34px;
  margin-bottom: 0;
  border-radius: 100%;
  background: #ffffff;
  border: 1px solid transparent;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  font-weight: normal;
  transition: all 0.2s ease-in-out;
}

#publisher_image .avatar-upload .avatar-edit input + label:hover {
  background: #f1f1f1;
  border-color: #d6d6d6;
}

#publisher_image .avatar-upload .avatar-edit input + label:after {
  font-family: "FontAwesome";
  color: #757575;
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  text-align: center;
  margin: auto;
}

#publisher_image .avatar-upload .avatar-preview {
  width: 140px;
  height: 140px;
  position: relative;
  border-radius: 100%;
  border: 2px solid #dfdfdf;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
}

#publisher_image .avatar-upload .avatar-preview > div {
  width: 100%;
  height: 100%;
  border-radius: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 90px;
  height: 34px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ca2222;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2ab934;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(55px);
  -ms-transform: translateX(55px);
  transform: translateX(55px);
}

/*------ ADDED CSS ---------*/
.on {
  display: none;
}

.on,
.off {
  color: white;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  font-size: 10px;
  font-family: Verdana, sans-serif;
  user-select: none;
}

input:checked + .slider .on {
  display: block;
}

input:checked + .slider .off {
  display: none;
}

/*--------- END --------*/

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
#qrcodeinput{
  width : 40% !important;
}
</style>
