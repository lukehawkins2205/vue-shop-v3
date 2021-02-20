<template>
    <v-data-table
    :headers="headers"
    :items="products"
    sort-by="price"
    class="elevation-1"
  >

  <template v-slot:item.img="{ item }">
          <img :src="item.img" style="width: 150px; height: 150px" />
    </template>


    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Products List</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Item
            </v-btn>
          </template>
          
          
          
          
          
          
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.price"
                      label="Price"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.cat"
                      label="Category"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.description"
                      label="Description"
                      mult-line
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >

                  <v-btn
                   @click="onPickFile"
                   color="primary"
                   dark
                   >Upload Image
                   </v-btn>

                    <input 
                    label="File input" 
                    type="file" 
                    @change="onFilePicked" 
                    accept="image/*"
                    ref="fileInput"
                    style="display: none" />

                    <img :src="editedItem.img" width="100%">

                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>




        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>





      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>



<script>
export default {
    name: 'ProductsAdminList',
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Price', value: 'price' },
        { text: 'Category', value: 'cat' },
        { text: 'Description', value: 'description', sortable: false },
        { text: 'Image', value: 'img', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      products: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        price: 0,
        cat: '',
        description: '',
        img: '',
        imageFileInput: null,
      },
      defaultItem: {
        name: '',
        price: 0,
        cat: '',
        description: '',
        img: '',
        imageFileInput: null,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
          this.products = this.$store.getters.loadedProducts

      },

      editItem (item) {
        this.editedIndex = this.products.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.products.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        const productID = this.products[this.editedIndex].id
        this.$store.dispatch('deleteProductOnDB', productID)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        const item = {
          name: this.editedItem.name,
          price: this.editedItem.price,
          cat: this.editedItem.cat,
          description: this.editedItem.description,
          img: this.editedItem.imageFileInput,
        }

        if (this.editedIndex > -1) {
          this.$store.dispatch('updateProductOnDB', item)
        } else {
          this.$store.dispatch('addProductToDB', item)
        }
        this.close()
      },
      onPickFile(){
        this.$refs.fileInput.click()
      },
      onFilePicked(e){
        const files = e.target.files
        //let  filename = files[0].name // filename is a prop provided by vanilla JS

        //need to add guard here to make sure its image files only with a proper extension.
        
        const fileReader = new FileReader() //filereader allows us to convert this file
        fileReader.addEventListener('load', () => {
          this.editedItem.img = fileReader.result //this result is base64 value //side note: src is able to handle base64 string.
        })
        fileReader.readAsDataURL(files[0]) //this will trigger an event as its an async function so we need to listen to the event above
        this.editedItem.imageFileInput = files[0] 
      } 

    },
}
</script>