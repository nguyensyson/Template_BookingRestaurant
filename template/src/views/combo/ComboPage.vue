<template>
	<div>
		<loading-component :loading="isLoading"/>
		<header-component/>
		<div class="page-heading products-heading header-text">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<div class="text-content">
							<h4>new arrivals</h4>
							<h2>sixteen products</h2>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="products">
			<div class="container-fluid">
				<div class="row">
					<div class="col-md-2 box">
						<div class="filters">
							<ul>
								<li class="active" data-filter="*">Filter</li>
							</ul>
						</div>
						<div>
							<div>
								<input class="form-control mb-3 mb-lg-2 mb-sm-2 mb-xxl-2" type="text" placeholder="Search" v-model="comboSearchRequest.name"/>
							</div>
							<!-- Categories -->
							<!--							<div>-->
							<!--								<h4>Category</h4>-->
							<!--								<ul class="m-4">-->
							<!--									<template v-for="item in categoryList" :key="item.id">-->
							<!--										<div>-->
							<!--											<input :id="item.name" class="m-1" type="checkbox" :value="item.id" :name="item.name" v-model="productSearchRequest.categoryIdList"/>-->
							<!--											<label :for="item.name">{{ item.name }}</label>-->
							<!--										</div>-->
							<!--									</template>-->
							<!--								</ul>-->
							<!--							</div>-->
						</div>
					</div>
					<div class="col-md-10 box">
						<div class="filters">
							<ul>
								<li class="active" data-filter="*">All Products</li>
								<li data-filter=".des">Featured</li>
								<li data-filter=".dev">Flash Deals</li>
								<li data-filter=".gra">Last Minute</li>
							</ul>
						</div>
						<div class="filters-content" v-if="!isLoading">
							<div class="row grid">
								<p>Có {{ productPage.totalElements + "" }} combo</p>
							</div>
							<div v-if="productList.length > 0" class="row grid">
								<product-component
									v-for="product in productList"
									:key="product.name"
									:class="PRODUCT_RESPONSIVE_CLASS.four"
									:product="product"
								/>
							</div>
							<div v-if="productList.length === 0" class="row grid">
								<div class="col-md-12">
									<div class="inner-content">
										<h4 class="text-center">Không có combo nào </h4>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-12" v-if="productList.length > 0">
							<page-component :page="0" :total-page="productPage.totalPages" :page-change="pageChange"/>
						</div>
					</div>
				</div>
			</div>
		</div>
		<footer-component/>
	</div>
</template>

<script lang="ts">
import HeaderComponent from "@/components/header/Header.vue";
import FooterComponent from "@/components/footer/Footer.vue";
import {defineComponent} from "vue";
import ProductComponent from "@/components/product/ProductComponent.vue";
import PageComponent from "@/components/pages/PageComponent.vue";
import LoadingComponent from "@/components/loading/LoadingComponent.vue";
import {PRODUCT_RESPONSIVE_CLASS} from "@/plugins/utils";
import {ProductComboSearchRequest} from "@/base/client/request/product-search-request";
import {Pageable} from "@/base/model/base.model";
import {ProductModel} from "@/base/model/product.model";
import {ProductService} from "@/base/service/product-service";

export default defineComponent({
	name: 'ComboPage',
	computed: {
		PRODUCT_RESPONSIVE_CLASS() {
			return PRODUCT_RESPONSIVE_CLASS
		}
	},
	components: {
		HeaderComponent,
		FooterComponent,
		ProductComponent,
		PageComponent,
		LoadingComponent
	},
	data() {
		return {
			productService: new ProductService(),
			comboSearchRequest: new ProductComboSearchRequest(),
			productPage: new Pageable<ProductModel>() as Pageable<ProductModel>,
			productList: [] as ProductModel[],
			categoryList: [],
			isLoading: false
		}
	},
	methods: {
		findProductPage() {
			this.isLoading = true;
			this.productService.findCombo(this.comboSearchRequest).then((response) => {
				this.productPage = response.data;
				if (this.productPage.content) {
					this.productList = this.productPage.content;
				}
				this.isLoading = false;
			})
		},
		pageChange(page: number) {
			this.comboSearchRequest.page = page;
			this.findProductPage();
		}
	},
	created() {
		this.findProductPage();
	}
})
</script>

<style scoped lang="css">
.products {
	margin-top: 100px;
}

.filters {
	text-align: center;
	border-bottom: 1px solid #eee;
	padding-bottom: 10px;
	margin-bottom: 60px;
}

.filters li {
	text-transform: uppercase;
	font-size: 13px;
	font-weight: 700;
	color: #121212;
	display: inline-block;
	margin: 0 10px;
	transition: all .3s;
	cursor: pointer;
}

/* Style for the filters container */

/* Style for the search input */
.form-control {
	width: 100%;
	padding: 8px;
	box-sizing: border-box;
	border: 1px solid #ccc;
	border-radius: 5px;
	margin-bottom: 15px;
}

/* Style for the category and brand sections */
div > div > h4 {
	font-size: 18px;
	margin-bottom: 10px;
}

/* Style for the checkboxes and labels */
input[type="checkbox"] {
	margin-right: 5px;
}

label {
	font-size: 14px;
}

/* Style for the active filter */
.filters ul li.active {
	background-color: #007bff;
	color: #fff;
	cursor: pointer;
	padding: 8px 15px;
	border-radius: 5px;
}

/* Hover effect for the filter items */
.filters ul li:hover {
	background-color: #0056b3;
	color: #fff;
}

@media (max-width: 767px) {
	.filters {
		margin-bottom: 30px;
	}
}
</style>