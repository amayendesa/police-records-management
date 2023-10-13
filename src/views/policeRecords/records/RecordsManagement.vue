<template>
  <div class="py-4 container-fluid">
    <div class="row" v-if="initTable">
      <div class="col-12">
        <div class="card">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <div>
                <h5 class="mb-0">All Records</h5>
                <p class="mb-0 text-sm">
                  A list of all crime records.
                </p>
              </div>
              <div class="my-auto ms-auto mt-4 mt-lg-0">

                <div class="my-auto ms-auto">
                  <a
                      class="mb-0 btn bg-gradient-primary2 btn-sm mx-1"
                      target="_blank"
                      @click="initTable=false;editedItem_agent=editedItem_agent_default;editedIndex=-1;dialog=true;new_edit_form=true;tbFunction();"
                  >+&nbsp; New Record</a>
                  <button
                      class="mt-1 mb-0 btn btn-outline-primary btn-sm export mt-sm-0"
                      data-type="csv"
                      type="button"
                      name="button"
                      @click="exportAgentsToExcel(all_agents)"
                  >
                    Export
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="px-0 pb-0 card-body">

            <div class="table-responsive container-fluid table-condensed">
              <table id="example" class="table table-striped" style="width:100%">
                <thead>
                <tr>
                  <th class="text-left">Case Number</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Time Committed</th>
                  <th>Time Complained</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(row,i) in all_agents" :key="i">
                  <td>{{ row.caseNumber }}</td>
                  <td>{{ row.type }}</td>
                  <td><a v-if="row.status==='OPEN'"
                         class="badge badge-danger">{{ row.status }}</a>
                  <a v-if="row.status==='CLOSED'"
                     class="badge badge-success">{{ row.status }}</a></td>
                  <td>{{ row.dateTimeCommitted }}</td>
                  <td>{{ row.dateTimeComplained }}</td>
                  <td><a
                      @click="initTable=false;editedIndex=i;record=row;new_edit_form=true;tbFunction();"
                  >
                    <i class="fas fa-eye text-primary"></i>
                  </a>
                    <a
                        class="mx-3"
                        @click="initTable=false;editedIndex=i;record=row;new_edit_form=true;initTable=false;tbFunction();"
                    >
                      <i class="fas fa-user-edit text-primary"></i>
                    </a>
                    <a
                        @click="editedIndex=i;"
                    >
                      <i class="fas fa-trash text-danger"></i>
                    </a></td>
                </tr>
                </tbody>
                <tfoot>
                <tr>

                </tr>
                </tfoot>
              </table>
              <div class="d-flex justify-content-center" v-if="loadTable">
                <div class="spinner-grow" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
              <br>
            </div>


          </div>
        </div>
      </div>
    </div>

    <div class="row" v-if="new_edit_form">
      <div class="mx-auto col-lg-10 col-12">
        <div class="mt-2 card card-body">
          <h6 class="mb-0">{{ formTitle }}</h6>
          <!--          <p class="mb-0 text-sm">Create new project</p>-->
          <hr class="my-3 horizontal dark"/>
          <div class="mt-3 row">
            <div class="mt-3 col-12 col-sm-6 mt-sm-0 col-md-4">
              <label>Case Number</label>
              <input
                  v-model="record.caseNumber"
                  placeholder="Case Number"
                  class="multisteps-form__input form-control"
              />
            </div>
            <div class="mt-3 col-12 col-sm-6 mt-sm-0 col-md-4">
              <label>Type (choose)</label>
              <select v-model="record.type" class="form-control"
                      name="choices-sizes">
                <option value="THEFT">THEFT</option>
                <option value="HOMICIDE">HOMICIDE</option>
                <option value="DOMESTIC VIOLENCE">DOMESTIC VIOLENCE</option>
                <option value="NON DOMESTIC VIOLENCE">NON DOMESTIC VIOLENCE</option>
              </select>
            </div>
            <div class="mt-3 col-12 col-sm-6 mt-sm-0 col-md-4">
              <label>Status (choose)</label>
              <select v-model="record.status" class="form-control"
                      name="choices-sizes">
                <option value="OPEN">OPEN</option>
                <option value="CLOSED">CLOSED</option>
              </select>
            </div>
            <div class="mt-3 col-12 col-sm-6 mt-sm-0 col-md-4">
              <label>Date Committed </label>
              <input
                  v-model="record.dateTimeCommitted"
                  placeholder="Date Committed"
                  type="datetime-local"
                  class="multisteps-form__input form-control"
              />
            </div>
            <div class="mt-3 col-12 col-sm-6 mt-sm-0 col-md-4">
              <label>Date Committed </label>
              <input
                  v-model="record.dateTimeComplained"
                  placeholder="Date Complained"
                  type="datetime-local"
                  class="multisteps-form__input form-control"
              />
            </div>
            <div class="mt-3 col-12 col-sm-6 mt-sm-0 col-md-4">
              <label>Complain </label>
              <textarea
                  v-model="record.complaint"
                  placeholder="Complain"
                  class="multisteps-form__input form-control"
              />
            </div>



            <div class="row">
              <br>
              <hr class="my-3 horizontal dark"/>
              <div class="col-md-8 col-lg-8 col-6">
                <h5 class="mb-0">Comments</h5>
              </div>
              <div class="col-md-4 col-lg-4 col-6">
                <a
                    class="mb-0 btn bg-gradient-primary2 btn-sm float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#commissionModal"
                    @click="editedIndexCommission=-1;dialogCommissionNew=true;"
                    target="_blank"
                >+&nbsp; New Comment</a>
              </div>
            </div>
            <div class="table-responsive container-fluid table-condensed">
              <br/>
              <table id="commission" class="table table-striped" style="width:100%">
                <thead>
                <tr>
                  <th class="text-left">Comment</th>
                  <th>Who</th>
                  <th>DateTime</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(row,i) in record.comments" :key="i">
                  <td>{{ row.comment }}</td>
                  <td>{{ row.who }}</td>
                  <td>{{ row.dateTime }}</td>
                  <td>
                    <div><a
                        data-bs-toggle="modal"
                        data-bs-target="#commissionModal"
                        @click="editItemCommissionNew(i);comment=row"
                    >
                      <i class="fas fa-eye text-primary"></i>
                    </a>
                      <a
                          data-bs-toggle="modal"
                          data-bs-target="#commissionModal"
                          class="mx-3"
                          @click="editItemCommissionNew(i);comment=row"
                      >
                        <i class="fas fa-user-edit text-primary"></i>
                      </a>
                      <a

                          @click="deleteItemCommissionNew(i)"
                      >
                        <i class="fas fa-trash text-danger"></i>
                      </a></div>
                  </td>
                </tr>
                </tbody>
                <tfoot>
                <tr>

                </tr>
                </tfoot>
              </table>
              <br>
            </div>

            <div class="row">
              <br>
              <hr class="my-3 horizontal dark"/>
              <div class="col-md-8 col-lg-8 col-6">
                <h5 class="mb-0">Officers Involved</h5>
              </div>
              <div class="col-md-4 col-lg-4 col-6">
                <a
                    class="mb-0 btn bg-gradient-primary2 btn-sm float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#suspenseModal"
                    @click="editedIndexsuspense=-1;dialogSuspenseNew=true;"
                    target="_blank"
                >+&nbsp; Officer</a>
              </div>
            </div>
            <div class="table-responsive container-fluid table-condensed">
              <br/>
              <table id="suspense" class="table table-striped" style="width:100%">
                <thead>
                <tr>
                  <th class="text-left">Officer Number</th>
                  <th>Name</th>
                  <th>Rank</th>
                  <th>Date Assigned</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(row,i) in record.officer" :key="i">
                  <td>{{ row.officerNumber }}</td>
                  <td>{{ row.name }}</td>
                  <td>{{ row.rank }}</td>
                  <td>{{ row.dateAssigned }}</td>
                  <td>
                    <div><a
                        data-bs-toggle="modal"
                        data-bs-target="#suspenseModal"
                        @click="editItemSuspenseNew(i);officer=row"
                    >
                      <i class="fas fa-eye text-primary"></i>
                    </a>
                      <a
                          data-bs-toggle="modal"
                          data-bs-target="#suspenseModal"
                          class="mx-3"
                          @click="editItemSuspenseNew(i);officer=row"
                      >
                        <i class="fas fa-user-edit text-primary"></i>
                      </a>
                      <a

                          @click="deleteItemSuspenseNew(i)"
                      >
                        <i class="fas fa-trash text-danger"></i>
                      </a></div>
                  </td>
                </tr>
                </tbody>
                <tfoot>
                <tr>

                </tr>
                </tfoot>
              </table>
              <br>
            </div>

            <div class="row">
              <br>
              <hr class="my-3 horizontal dark"/>
              <div class="col-md-8 col-lg-8 col-6">
                <h5 class="mb-0">Files</h5>
              </div>
              <div class="col-md-4 col-lg-4 col-6">
                <a
                    class="mb-0 btn bg-gradient-primary2 btn-sm float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#directorModal"
                    @click="editedIndexDirector=-1;dialogDirector=true;"
                    target="_blank"
                >+&nbsp; New File</a>
              </div>
            </div>
            <div class="table-responsive container-fluid table-condensed">
              <br/>
              <table id="directors" class="table table-striped" style="width:100%">
                <thead>
                <tr>
                  <th class="text-left">File Number</th>
                  <th>File Name</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(row,i) in record.files" :key="i">
                  <td>{{ row.fileNumber }}</td>
                  <td>{{ row.fileName }}</td>
                  <td>
                    <div><a
                        data-bs-toggle="modal"
                        data-bs-target="#directorModal"
                        @click="editItemDirectorNew(i);file=row"
                    >
                      <i class="fas fa-eye text-primary"></i>
                    </a>
                      <a
                          data-bs-toggle="modal"
                          data-bs-target="#directorModal"
                          class="mx-3"
                          @click="editItemDirectorNew(i);file=row"
                      >
                        <i class="fas fa-user-edit text-primary"></i>
                      </a>
                      <a

                          @click="deleteItemDirectorNew(i)"
                      >
                        <i class="fas fa-trash text-danger"></i>
                      </a></div>
                  </td>
                </tr>
                </tbody>
                <tfoot>
                <tr>

                </tr>
                </tfoot>
              </table>
              <br>
            </div>

            <hr class="my-3 horizontal dark"/>
          </div>
        </div>
        <div class="mt-4 d-flex justify-content-end">
          <button type="button" name="button" class="m-0 btn btn-light"
                  @click="new_edit_form=false;initTable=true;tbFunction();">
            Cancel
          </button>
          <button
              type="button"
              name="button"
              class="m-0 btn bg-gradient-success ms-2"
              @click="all_agents=[];new_edit_form=false;initTable=true;save()"
          >
            Save
          </button>
        </div>
      </div>
    </div>

    <div class="row" v-if="view_user">
      <div class="mx-auto col-lg-10 col-12">
        <div class="mt-2 card card-body">
          <h6 class="mb-0">User Details</h6>
          <!--          <p class="mb-0 text-sm">Create new project</p>-->
          <hr class="my-3 horizontal dark"/>
          <div class="mt-3 row" v-if="!loadTable">
            <div class="mt-3 col-12 col-sm-6 mt-sm-0 col-md-6">
              <label>First Name</label>
              <input
                  v-model="user.firstName"
                  placeholder="First Name"
                  class="multisteps-form__input form-control"
                  readonly="readonly"
              />
            </div>
            <div class="mt-3 col-12 col-sm-6 mt-sm-0 col-md-6">
              <label>Last Name </label>
              <input
                  v-model="user.lastName"
                  placeholder="Last Name"
                  class="multisteps-form__input form-control"
                  readonly="readonly"
              />
            </div>
            <div class="mt-3 col-12 col-sm-6 mt-sm-0 col-md-6">
              <label>Username </label>
              <input
                  v-model="user.username"
                  placeholder="Username"
                  class="multisteps-form__input form-control"
                  readonly="readonly"
              />
            </div>
            <div class="mt-3 col-12 col-sm-6 mt-sm-0 col-md-6">
              <label>Email </label>
              <input
                  v-model="user.email"
                  placeholder="Email"
                  class="multisteps-form__input form-control"
                  readonly="readonly"
              />
            </div>
            <div class="mt-3 col-12 col-sm-6 mt-sm-0 col-md-6">
              <label>ID </label>
              <input
                  v-model="user.id"
                  placeholder="ID"
                  class="multisteps-form__input form-control"
                  readonly="readonly"
              />
            </div>
            <div class="mt-3 col-12 col-sm-6 mt-sm-0 col-md-6" v-if="user.attributes.agent_id">
              <label>Agent ID</label>
              <input
                  v-model="user.attributes.agent_id[0]"
                  placeholder="Agent ID"
                  class="multisteps-form__input form-control"
                  readonly="readonly"
              />
            </div>

            <hr class="my-3 horizontal dark"/>
          </div>

          <div class="d-flex justify-content-center" v-if="loadTable">
            <div class="spinner-grow" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
        <div class="mt-4 d-flex justify-content-end">
          <button
              type="button"
              name="button"
              class="m-0 btn bg-gradient-success ms-2"
              @click="new_edit_form=false;view_user=false;initTable=true;tbFunction();user=user_default"
          >
            OK
          </button>
        </div>
      </div>
    </div>

    <div
        id="commissionModal"
        class="modal fade"
        tabindex="-1"
        aria-hidden="true"
        role="dialog"
        aria-labelledby="exampleModalLabel"
    >
      <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content" role="document">
          <div class="modal-header">
            <h5 id="ModalLabel1" class="modal-title">
              {{ formCommissionNew }}
            </h5>
            <!--            <i class="fas fa-upload ms-3"></i>-->
            <button
                style="background-color:#3A416F"
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">

            <div class="row">
              <div class="mt-3 col-12 col-sm-6 mt-sm-0 col-md-4">
                <label> Comment</label>
                <textarea
                    v-model="comment.comment"
                    placeholder="Comment"
                    class="multisteps-form__input form-control"
                />
              </div>
            </div>


          </div>
          <div class="modal-footer">
            <button
                type="button"
                class="btn bg-gradient-secondary btn-sm"
                data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
                type="button"
                class="btn bg-gradient-success btn-sm"
                @click="saveCommissionNew();"
                data-bs-dismiss="modal"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
        id="suspenseModal"
        class="modal fade"
        tabindex="-1"
        aria-hidden="true"
        role="dialog"
        aria-labelledby="exampleModalLabel"
    >
      <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content" role="document">
          <div class="modal-header">
            <h5 id="ModalLabel11" class="modal-title">
              {{ formSuspenseNew }}
            </h5>
            <!--            <i class="fas fa-upload ms-3"></i>-->
            <button
                style="background-color:#3A416F"
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">

            <div class="row">

              <div class="mt-3 col-12 col-sm-6 mt-sm-0 col-md-3">
                <label> Officer's Number</label>
                <input
                    v-model="officer.officerNumber"
                    placeholder="Officer's Number"
                    class="multisteps-form__input form-control"
                />
              </div>

              <div class="mt-3 col-12 col-sm-6 mt-sm-0 col-md-3">
                <label> Officer's Name</label>
                <input
                    v-model="officer.name"
                    placeholder="Officer's Name"
                    class="multisteps-form__input form-control"
                />
              </div>
              <div class="mt-3 col-12 col-sm-6 mt-sm-0 col-md-3">
                <label>Rank </label>
                <input
                    v-model="officer.rank"
                    placeholder="Rank"
                    class="multisteps-form__input form-control"
                />
              </div>
              <div class="mt-3 col-12 col-sm-6 mt-sm-0 col-md-3">
                <label> Date Assigned</label>
                <input
                    v-model="officer.dateAssigned"
                    placeholder="Date Assigned"
                    type="date"
                    class="multisteps-form__input form-control"
                />
              </div>
            </div>


          </div>
          <div class="modal-footer">
            <button
                type="button"
                class="btn bg-gradient-secondary btn-sm"
                data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
                type="button"
                class="btn bg-gradient-success btn-sm"
                @click="saveSuspenseNew();"
                data-bs-dismiss="modal"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
        id="directorModal"
        class="modal fade"
        tabindex="-1"
        aria-hidden="true"
        role="dialog"
        aria-labelledby="exampleModalLabel"
    >
      <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content" role="document">
          <div class="modal-header">
            <h5 id="ModalLabel12" class="modal-title">
              {{ formDirectorNew }}
            </h5>
            <!--            <i class="fas fa-upload ms-3"></i>-->
            <button
                style="background-color:#3A416F"
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">

            <div class="row">
              <div class="mt-3 col-12 col-sm-6 mt-sm-0 col-md-4">
                <label> File Number</label>
                <input
                    v-model="file.fileNumber"
                    placeholder="File Number"
                    class="multisteps-form__input form-control"
                />
              </div>
              <div class="mt-3 col-12 col-sm-6 mt-sm-0 col-md-4">
                <label> File Name</label>
                <input
                    v-model="file.fileName"
                    placeholder="File Name"
                    class="multisteps-form__input form-control"
                />
              </div>
              <div class="mt-3 col-12 col-sm-6 mt-sm-0 col-md-4">
                <label> File</label>
                <input
                    type="file"
                    placeholder="File"
                    class="multisteps-form__input form-control"
                />
              </div>
            </div>

          </div>
          <div class="modal-footer">
            <button
                type="button"
                class="btn bg-gradient-secondary btn-sm"
                data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
                type="button"
                class="btn bg-gradient-success btn-sm"
                @click="saveDirectorNew();"
                data-bs-dismiss="modal"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import $ from 'jquery'
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js'
// import 'bootstrap/js/dist/modal'
// import 'datatables.net-bs5'
// import {faCreditCard, faHandPointer, faScrewdriverWrench, faUsers} from "@fortawesome/free-solid-svg-icons";
// import axios from 'axios'
import {keyCloakFunction, keyCloakFunctionAppend} from "@/services/auth-token";
// import SoftButton from "@/components/SoftButton.vue";
// import authService from '@/services/auth-token'
// import { toInteger } from 'lodash'
// import Vue from 'vue'
// import VueToast from 'vue-toast-notification'
// import 'vue-toast-notification/dist/theme-sugar.css'
// import moment from 'moment'
// import flatPickr from "vue-flatpickr-component";
// import Dropzone from "dropzone";
// import Choices from "choices.js";

// import Quill from "quill";

export default {
  name: "RecordsManagement",
  components: {
    // flatPickr,
    // SoftButton,
  },
  data() {
    return {
      record: {
        id: null,
        caseNumber: "",
        type: "THEFT",
        officer: [],
        complaint: "",
        comments: [],
        files: [],
        status: "OPEN",
        dateTimeCommitted: "",
        dateTimeComplained: ""
      },
      record_default: {
        id: null,
        caseNumber: "",
        type: "THEFT",
        officer: [],
        complaint: "",
        comments: [],
        files: [],
        status: "OPEN",
        dateTimeCommitted: "",
        dateTimeComplained: ""
      },
      user: { id: null,
        firstName: "",
        lastName: "",
        password: "",
        userType: "Admin",
        username: "",
        createdDate: ""
      },
      user_default: { id: null,
        firstName: "",
        lastName: "",
        password: "",
        userType: "Admin",
        username: "",
        createdDate: ""
      },
      comment: {id:  null, comment: "", dateTime:  "", who: ""},
      comment_default: {id:  null, comment: "", dateTime:  "", who: ""},
      file: {id: null, fileNumber: "", file: "", fileName: ""},
      file_default: {id: null, fileNumber: "", file: "", fileName: ""},
      officer: {id: null, officerNumber: "", name: "", rank:  "", dateAssigned: ""},
      officer_default: {id: null, officerNumber: "", name: "", rank:  "", dateAssigned: ""},
      msg: [],
      mobile1V: true,
      mobile2V: true,
      mobile3V: true,
      name1V: true,
      name2V: true,
      name3V: true,
      nationalID1V: true,
      nationalID2V: true,
      account1V: true,
      account2V: true,
      account3V: true,
      address1V: true,
      address2V: true,
      address3V: true,
      accountClass1V: true,
      accountClass2V: true,
      accountClass3V: true,
      accountDescription1V: true,
      accountDescription2V: true,
      accountDescription3V: true,
      accountClassDescription1V: true,
      accountClassDescription2V: true,
      accountClassDescription3V: true,
      status1V: true,
      status2V: true,
      status3V: true,
      status4V: true,
      branch1V: true,
      branch2V: true,
      branch3V: true,
      percentage1V: true,
      percentage2V: true,
      percentage3V: true,
      agentName1V: true,
      agentName2V: true,
      agentName3V: true,
      merchantName1V: true,
      merchantName2V: true,
      merchantName3V: true,
      tbShow: true,
      new_edit_form: false,
      initTable: true,
      view_user: false,
      date: "",
      roles: [],
      endDate: "",
      config: {
        allowInput: true,
      },
      values: ['ZWL', 'USD', 'ZAR', 'GBP'],
      table_currency: 'ZWL',
      loadTable: true,
      search: '',
      dialog: false,
      dialogDirector: false,

      dialogDelete: false,
      dialogDeleteDirectorNew: false,
      dialogDirectorNew: false,
      dialogCommission: false,
      dialogDeleteCommissionNew: false,
      dialogCommissionNew: false,
      dialogSuspense: false,
      dialogDeleteSuspenseNew: false,
      dialogSuspenseNew: false,
      currencies_suspense: ['ZWL', 'USD', 'ZAR', 'GBP'],
      currencies_suspense_there: [],
      currencies_suspense_values: [],
      currencies_commission_there: [],
      currencies_commission_values: [],
      currencies_commission: ['ZWL', 'USD', 'ZAR', 'GBP'],
      currencies_default: ['ZWL', 'USD', 'ZAR', 'GBP'],
      headers_agents: [
        {
          text: 'Agent Code',
          align: 'start',
          sortable: true,
          value: 'id',
        },
        {text: 'Agent Name', value: 'agentName'},
        {text: 'Mobile Number', value: 'mobileNumber'},
        {text: 'Agent Agreed Commission Percentage', value: 'agentAgreedCommissionPercentage'},
        {text: 'Super Agent', align: 'end', value: 'superAgent.id'},
        {text: 'Status', value: 'status'},
        {text: 'Actions', value: 'actions', sortable: false},
      ],
      headers_account: [
        {
          text: 'Number',
          align: 'start',
          sortable: true,
          value: 'accountNumber',
        },
        {text: 'Description', value: 'accountDescription'},
        {text: 'Class', value: 'accountClass'},
        {text: 'Branch', value: 'accountBranch'},
        {text: 'Currency', align: 'end', value: 'accountCurrency'},
        // { text: 'Status', value: 'status' },
        {text: 'Actions', value: 'actions', sortable: false},
      ],
      suspenseAccount: {
        id: null,
        accountNumber: '',
        accountDescription: '',
        accountClass: '',
        accountBranch: '',
        accountClassDescription: '',
        accountCurrency: 'ZWL',
        expiryDate: null,
        status: 'P',
        createdTime: '2022-05-05T12:34:15.998456',
        updatedTime: '2022-05-05T12:34:15.998465',
        deleted: false,
      },
      suspenseAccount_default: {
        id: null,
        accountNumber: '',
        accountDescription: '',
        accountClass: '',
        accountBranch: '',
        accountClassDescription: '',
        accountCurrency: 'ZWL',
        expiryDate: null,
        status: 'P',
        createdTime: '2022-05-05T12:34:15.998456',
        updatedTime: '2022-05-05T12:34:15.998465',
        deleted: false,
      },
      commissionAccount: {
        id: null,
        accountNumber: '',
        accountDescription: '',
        accountClass: '',
        accountBranch: '',
        accountClassDescription: '',
        accountCurrency: 'ZWL',
        expiryDate: null,
        status: 'P',
        createdTime: '2022-05-05T12:34:15.998456',
        updatedTime: '2022-05-05T12:34:15.998465',
        deleted: false,
      },
      commissionAccount_default: {
        id: null,
        accountNumber: '',
        accountDescription: '',
        accountClass: '',
        accountBranch: '',
        accountClassDescription: '',
        accountCurrency: 'ZWL',
        expiryDate: null,
        status: 'P',
        createdTime: '2022-05-05T12:34:15.998456',
        updatedTime: '2022-05-05T12:34:15.998465',
        deleted: false,
      },
      editedIndexSuspense: -1,
      editedIndexCommission: -1,
      desserts: [],
      all_agents: [],
      editedIndex: -1,
      editedIndexDirector: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      director: {
        id: null,
        personNo: '',
        sex: '',
        status: '',
        firstName: '',
        surname: '',
        dateOfBirth: '',
        dateOfDeath: '',
        birthPlace: '',
        source: '',
        lastRefreshedTime: '',
        customerId: '',
        nationalIdNr: '',
        mobileNr: '',
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      headers_directors: [
        {
          text: 'National Id',
          align: 'start',
          sortable: true,
          value: 'nationalIdNr',
        },
        {text: 'First Name', value: 'firstName'},
        {text: 'Surname', value: 'surname'},
        {text: 'Gender', value: 'sex'},
        {text: 'Phone', value: 'mobileNr'},
        {text: 'Actions', value: 'actions', sortable: false},
      ],
      editedItem_agent: {
        id: '000000',
        agentName: '',
        directors: [],
        mobileNumber: '',
        agentSuspenseAccount: [],
        agentCommissionAccount: [],
        agentAgreedCommissionPercentage: 0.0,
        chargesPrepaid: false,
        doesNotEarnCommission: false,
        donnerAgent: false,
        receivingAgentCommissionPrepaid: false,
        taxPrepaid: false,
        superAgent: null,
        status: 'P',
        createdTime: '2022-05-05T12:34:16.008373',
        updatedTime: '2022-05-05T12:34:16.008388',
      },
      editedItem_agent_default: {
        id: '000000',
        agentName: '',
        directors: [],
        mobileNumber: '',
        agentSuspenseAccount: [],
        agentCommissionAccount: [],
        agentAgreedCommissionPercentage: 0.0,
        chargesPrepaid: false,
        doesNotEarnCommission: false,
        donnerAgent: false,
        receivingAgentCommissionPrepaid: false,
        taxPrepaid: false,
        superAgent: null,
        status: 'P',
        createdTime: '2022-05-05T12:34:16.008373',
        updatedTime: '2022-05-05T12:34:16.008388',
      },
      editedIndexObligation: -1,
      directorDefault: {
        id: null,
        personNo: '',
        sex: '',
        status: '',
        firstName: '',
        surname: '',
        dateOfBirth: '',
        dateOfDeath: '',
        birthPlace: '',
        source: '',
        lastRefreshedTime: '',
        customerId: '',
        nationalIdNr: '',
        mobileNr: '',
      },
    }
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Record' : 'Edit Record'
    },
    formDirectorNew() {
      return this.editedIndexDirector === -1 ? 'New File' : 'Edit File'
    },
    formCommissionNew() {
      return this.editedIndexCommission === -1 ? 'New Comment' : 'Edit Comment'
    },
    formSuspenseNew() {
      return this.editedIndexSuspense === -1 ? 'New Officer' : 'Edit Officer'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
    dialogDirector(val) {
      val || this.closeObligation()
    },
    dialogDirectorNew(val) {
      val || this.closeDirectorNew()
    },
    dialogDeleteDirectorNew(val) {
      val || this.closeDeleteDirectorNew()
    },
  },

  async created() {
    // window.addEventListener('load', async () => {
    //   // run after everything is in-place
    //   await this.initialize()
    // })
  },

  async mounted() {
    await this.initialize()
  },

  methods: {
    tbFunction() {
      try {
        $(document).ready(function () {
          $('#example').DataTable();
        });
      } catch (e) {
        console.log(e)
      }
      try {
        $(document).ready(function () {
          $('#commission').DataTable();
        });
      } catch (e) {
        console.log(e)
      }
      try {
        $(document).ready(function () {
          $('#suspense').DataTable();
        });
      } catch (e) {
        console.log(e)
      }
      try {
        $(document).ready(function () {
          $('#directors').DataTable();
        });
      } catch (e) {
        console.log(e)
      }
    },




    async initialize() {
      // Vue.use(VueToast, {
      //   // One of the options
      //   position: 'top-right',
      // })
      this.loadTable = true
      try {
        const v = await keyCloakFunctionAppend('GET',
            '/records_server/records',
            {})
        // console.log(v.data)
        if (v.statusText === 'OK' || v.status === 304) {
          this.all_agents = v.data
          // console.log(this.all_agents)
        } else {
          this.loadTable = false
          if (/^5/.test(v.status) || /^5/.test(v.response.status)
          ) {
            this.$swal({
              icon: "error",
              title: "Error!",
              text: "There was a problem processing request",
              // //timer: 1500,
            });
          } else {
            if (v.response.data.errorDescription) {
              this.$swal({
                icon: "error",
                title: "Error!",
                text: v.response.data.errorDescription,
                // //timer: 1500,
              });
            } else {
              this.$swal({
                icon: "error",
                title: "Error!",
                text: "There was a problem processing request",
                // //timer: 1500,
              });
            }
          }


        }
        this.loadTable = false
        try {
          $('#example').DataTable().destroy();
        } catch (e) {
          console.log(e)
        }
        this.tbFunction();
      } catch (e) {
        this.$swal({
          icon: "error",
          title: "Error!",
          text: "Process Failed",
          // //timer: 1500,
        });
        try {
          $('#example').DataTable().destroy();
        } catch (e) {
          console.log(e)
        }
        this.tbFunction();
        this.loadTable = false
      }
    },

    async viewUser(userId) {
      this.loadTable = true
      try {
        const v = await keyCloakFunction('GET',
            '/agency_banking/user/' + userId,
            {}, this.$cookies.get('refresh_token'))
        if (v.statusText === 'OK') {
          this.user = v.data
        } else {
          this.loadTable = false
          if (/^5/.test(v.status) || /^5/.test(v.response.status)
          ) {
            this.$swal({
              icon: "error",
              title: "Error!",
              text: "There was a problem processing request",
              // //timer: 1500,
            });
          } else {
            if (v.response.data.errorDescription) {
              this.$swal({
                icon: "error",
                title: "Error!",
                text: v.response.data.errorDescription,
                // //timer: 1500,
              });
            } else {
              this.$swal({
                icon: "error",
                title: "Error!",
                text: "There was a problem processing request",
                // //timer: 1500,
              });
            }
          }


        }
        this.loadTable = false
      } catch (e) {
        this.$swal({
          icon: "error",
          title: "Error!",
          text: "Process Failed",
          // //timer: 1500,
        });
        this.loadTable = false
      }
    },

    exportAgentsToExcel(userList) {
      const XLSX = require('xlsx');
      const path = require('path');
      const workSheetColumnNames = [
        "Agent ID",
        "Agent Name",
        "Mobile Number",
        "Super Agent ID",
        "Status",
        "Time Created",
        "Time Updated",
        "Created By",
        "Updated By"
      ];
      const workSheetName = 'My Agents';
      const date = new Date().toISOString()
      const filePath = './my_agents_' + date.substring(0, date.length - 5) + '.xlsx';
      const data = userList.map(user => {
        return [user.id, user.agentName, user.mobileNumber, user.superAgent.id, user.status, user.createdTime, user.updatedTime, user.createdBy, user.lastModified];
      });
      const workBook = XLSX.utils.book_new();
      const workSheetData = [
        workSheetColumnNames,
        ...data
      ]

      const workSheet = XLSX.utils.aoa_to_sheet(workSheetData);
      XLSX.utils.book_append_sheet(workBook, workSheet, workSheetName);
      XLSX.writeFile(workBook, path.resolve(filePath));
      return true;
    },

    fixCurrenciesSuspence() {
      this.currencies_suspense_values = []
      this.currencies_suspense = this.currencies_default
      this.currencies_suspense_there = []
      this.editedItem_agent.agentSuspenseAccount.forEach(o => {
        this.currencies_suspense_there.push(o.accountCurrency)
      })
      let there = false
      this.currencies_suspense.forEach(o => {
        this.currencies_suspense_there.forEach(i => {
          if (o === i) {
            there = true
          }
        })
        if (!there) {
          this.currencies_suspense_values.push(o)
        }
        there = false
      })
      if (this.currencies_suspense_values > 0) {
        this.dialogSuspenseNew = true
      }
    },

    fixCurrenciesCommission() {
      this.currencies_commission_values = []
      this.currencies_commission = this.currencies_default
      this.currencies_commission_there = []
      this.editedItem_agent.agentCommissionAccount.forEach(o => {
        this.currencies_commission_there.push(o.accountCurrency)
      })
      let there = false
      this.currencies_commission.forEach(o => {
        this.currencies_commission_there.forEach(i => {
          if (o === i) {
            there = true
          }
        })
        if (!there) {
          this.currencies_commission_values.push(o)
        }
        there = false
      })
      if (this.currencies_commission_values > 0) {
        this.dialogCommissionNew = true
      }
    },

    editItem(item) {
      this.editedIndex = this.all_agents.indexOf(item)
      this.editedItem_agent = JSON.parse(JSON.stringify(item))
      this.dialog = true
    },

    editItemDirectorNew(index) {
      this.editedIndexDirector = index
      // this.director = JSON.parse(JSON.stringify(this.editedItem_agent.directors[index]))
      // this.dialogDirectorNew = true
    },

    // deleteItem (item) {
    //   // this.editedIndex = this.desserts.indexOf(item)
    //   // this.editedItem = Object.assign({}, item)
    //   this.dialogDelete = true
    // },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = JSON.parse(JSON.stringify(this.defaultItem))
        this.editedIndex = -1
      })
    },

    closeObligation() {
      this.dialogDirector = false
      this.$nextTick(() => {
        this.director = JSON.parse(JSON.stringify(this.directorDefault))
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = JSON.parse(JSON.stringify(this.defaultItem))
        this.editedIndex = -1
      })
    },

    async save() {
      if (this.editedIndex > -1) {
        try {
          const v = await keyCloakFunction('PATCH',
              '/records_server/records/'+this.record.id, this.record)
          if (v.statusText === 'OK' || v.status === 304) {
            this.$swal({
              icon: "success",
              title: "Saving",
              text: "Saved successfully!",
              //timer: 1500,
            });
          } else {
            this.loadTable = false
            if (/^5/.test(v.status) || /^5/.test(v.response.status)
            ) {
              this.$swal({
                icon: "error",
                title: "Error!",
                text: "There was a problem processing request",
                // //timer: 1500,
              });
            } else {
              if (v.response.data.errorDescription) {
                this.$swal({
                  icon: "error",
                  title: "Error!",
                  text: v.response.data.errorDescription,
                  // //timer: 1500,
                });
              }  else {
                this.$swal({
                  icon: "error",
                  title: "Error!",
                  text: "There was a problem processing request",
                  // //timer: 1500,
                });
              }
            }


          }
        } catch (e) {
          this.$swal({
            icon: "error",
            title: "Error!",
            text: "There was an error during save!",
            //timer: 1500,
          });
          console.log(e)
        }
      } else {
        // console.log(this.editedItem_band)
        try {
          const v = await keyCloakFunction('POST',
              '/records_server/records', this.record)
          if (v.statusText === 'OK' || v.status === 304) {
            this.$swal({
              icon: "success",
              title: "Saving",
              text: "Saved successfully!",
              //timer: 1500,
            });
          } else {
            this.loadTable = false
            if (/^5/.test(v.status) || /^5/.test(v.response.status)
            ) {
              this.$swal({
                icon: "error",
                title: "Error!",
                text: "There was a problem processing request",
                // //timer: 1500,
              });
            } else {
              if (v.response.data.errorDescription) {
                this.$swal({
                  icon: "error",
                  title: "Error!",
                  text: v.response.data.errorDescription,
                  // //timer: 1500,
                });
              }  else {
                this.$swal({
                  icon: "error",
                  title: "Error!",
                  text: "There was a problem processing request",
                  // //timer: 1500,
                });
              }
            }


          }
        } catch (e) {
          this.$swal({
            icon: "error",
            title: "Saving",
            text: "There was an error during save!",
            //timer: 1500,
          });
          console.log(e)
        }
      }
      this.record = JSON.parse(JSON.stringify(this.record_default))
      await this.initialize();
      this.close()
    },

    deleteItemDirectorNew(item) {
      this.editedIndexObligation = item
      this.file = JSON.parse(JSON.stringify(this.file_default))
      this.dialogDeleteDirectorNew = true
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
        customClass: {
          confirmButton: "btn bg-gradient-success",
          cancelButton: "btn bg-gradient-danger",
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteItemConfirmDirectorNew();
          try {
            $('#directors').DataTable().destroy();
            this.tbFunction();
          } catch (e) {
            console.log(e)
          }
          this.$swal({
            title: "Deleted!",
            text: "Record successfully deleted.",
            icon: "success",
            customClass: {
              confirmButton: "btn bg-gradient-success",
            },
            buttonsStyling: false,
            //timer: 1500,
          });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === this.$swal.DismissReason.cancel
        ) {
          this.$swal({
            title: "Cancelled!",
            text: "Process cancelled.",
            icon: "error",
            customClass: {
              confirmButton: "btn bg-gradient-success",
            },
            buttonsStyling: false,
            //timer: 1500,
          });
        }
      });
    },

    deleteItemConfirmDirectorNew() {
      this.record.files.splice(this.editedIndexObligation, 1)
      this.closeDeleteDirectorNew()
    },

    closeDirectorNew() {
      this.dialogDirectorNew = false
      this.$nextTick(() => {
        this.director = JSON.parse(JSON.stringify(this.directorDefault))
        this.editedIndexObligation = -1
      })
    },

    closeDeleteDirectorNew() {
      this.dialogDeleteDirectorNew = false
      this.$nextTick(() => {
        this.director = JSON.parse(JSON.stringify(this.directorDefault))
        this.editedIndexObligation = -1
      })
    },

    saveDirectorNew() {
      if (this.editedIndexDirector === -1) {
        this.record.files.push(JSON.parse(JSON.stringify(this.file)))
        try {
          $('#directors').DataTable().destroy();
          this.tbFunction();
        } catch (e) {
          console.log(e)
        }
        this.closeDirectorNew()
      } else {
        this.record.files[this.editedIndexDirector] = JSON.parse(JSON.stringify(this.file))
        this.file = JSON.parse(JSON.stringify(this.file_default))
        this.closeDirectorNew()
      }
      this.$swal({
        icon: "success",
        title: "Saved",
        text: "Successfully saved!",
        //timer: 1500,
      });
    },

    saveSuspenseNew() {
      if (this.editedIndexSuspense === -1) {
        this.record.officer.push(JSON.parse(JSON.stringify(this.officer)))
        try {
          $('#suspense').DataTable().destroy();
          this.tbFunction();
        } catch (e) {
          console.log(e)
        }
        this.closeSuspenseNew()
      } else {
        this.record.officer[this.editedIndexSuspense] = JSON.parse(JSON.stringify(this.officer_default))
        this.officer = JSON.parse(JSON.stringify(this.officer_default))
        this.closeSuspenseNew()
      }
      this.$swal({
        icon: "success",
        title: "Saved",
        text: "Successfully saved!",
        //timer: 1500,
      });
    },
    deleteItemCommissionNew(item) {
      this.editedIndexCommission = item
      this.comment = JSON.parse(JSON.stringify(this.comment_default))
      this.dialogDeleteCommissionNew = true
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
        customClass: {
          confirmButton: "btn bg-gradient-success",
          cancelButton: "btn bg-gradient-danger",
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteItemConfirmCommissionNew();
          try {
            $('#commission').DataTable().destroy();
            this.tbFunction();
          } catch (e) {
            console.log(e)
          }
          this.$swal({
            title: "Deleted!",
            text: "Record successfully deleted.",
            icon: "success",
            customClass: {
              confirmButton: "btn bg-gradient-success",
            },
            buttonsStyling: false,
            //timer: 1500,
          });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === this.$swal.DismissReason.cancel
        ) {
          this.$swal({
            title: "Cancelled!",
            text: "Process cancelled.",
            icon: "error",
            customClass: {
              confirmButton: "btn bg-gradient-success",
            },
            buttonsStyling: false,
            //timer: 1500,
          });
        }
      });
    },

    deleteItemConfirmCommissionNew() {
      this.record.comments.splice(this.editedIndexCommission, 1)
      this.closeDeleteCommissionNew()
    },

    closeCommissionNew() {
      this.dialogCommissionNew = false
      this.$nextTick(() => {
        this.commissionAccount = JSON.parse(JSON.stringify(this.commissionAccount_default))
        this.editedIndexCommission = -1
      })
    },

    closeDeleteCommissionNew() {
      this.dialogDeleteCommissionNew = false
      this.$nextTick(() => {
        this.commissionAccount = JSON.parse(JSON.stringify(this.commissionAccount_default))
        this.editedIndexCommission = -1
      })
    },
    saveCommissionNew() {
      if (this.editedIndexCommission === -1) {
        this.record.comments.push(JSON.parse(JSON.stringify(this.comment)))
        try {
          $('#commission').DataTable().destroy();
          this.tbFunction();
        } catch (e) {
          console.log(e)
        }
        this.closeCommissionNew()
      } else {
        this.record.comments[this.editedIndexCommission] = JSON.parse(JSON.stringify(this.comment))
        this.comment = JSON.parse(JSON.stringify(this.comment_default))
        this.closeCommissionNew()
      }
      this.$swal({
        icon: "success",
        title: "Saved",
        text: "Successfully saved!",
        //timer: 1500,
      });
    },
    deleteItemSuspenseNew(item) {
      this.editedIndexSuspense = item
      this.officer = JSON.parse(JSON.stringify(this.officer_default))
      this.dialogDeleteSuspenseNew = true
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
        customClass: {
          confirmButton: "btn bg-gradient-success",
          cancelButton: "btn bg-gradient-danger",
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteItemConfirmSuspenseNew();
          try {
            $('#suspense').DataTable().destroy();
            this.tbFunction();
          } catch (e) {
            console.log(e)
          }
          this.$swal({
            title: "Deleted!",
            text: "Record successfully deleted.",
            icon: "success",
            customClass: {
              confirmButton: "btn bg-gradient-success",
            },
            buttonsStyling: false,
            //timer: 1500,
          });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === this.$swal.DismissReason.cancel
        ) {
          this.$swal({
            title: "Cancelled!",
            text: "Process cancelled.",
            icon: "error",
            customClass: {
              confirmButton: "btn bg-gradient-success",
            },
            buttonsStyling: false,
            //timer: 1500,
          });
        }
      });
    },

    deleteItemConfirmSuspenseNew() {
      this.record.officer.splice(this.editedIndexSuspense, 1)
      this.closeDeleteSuspenseNew()
    },

    closeSuspenseNew() {
      this.dialogSuspenseNew = false
      this.$nextTick(() => {
        this.suspenseAccount = JSON.parse(JSON.stringify(this.suspenseAccount_default))
        this.editedIndexSuspense = -1
      })
    },

    closeDeleteSuspenseNew() {
      this.dialogDeleteSuspenseNew = false
      this.$nextTick(() => {
        this.suspenseAccount = JSON.parse(JSON.stringify(this.suspenseAccount_default))
        this.editedIndexSuspense = -1
      })
    },

    editItemSuspenseNew(index) {
      this.editedIndexSuspense = index
      // this.suspenseAccount = JSON.parse(JSON.stringify(this.editedItem_agent.agentCommissionAccount[index]))
      // this.dialogSuspenseNew = true
    },

    editItemCommissionNew(index) {
      this.editedIndexCommission = index
      // this.commissionAccount = JSON.parse(JSON.stringify(this.editedItem_agent.agentCommissionAccount[index]))
      // this.dialogCommissionNew = true
    },

  },
};
</script>
<style #scoped>
.table-condensed {
  font-size: 0.775rem !important;
}

a {
  cursor: pointer;
}

input.errorClass {
  border: 1px solid red;
}
</style>
