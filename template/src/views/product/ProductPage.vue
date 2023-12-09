<template>
	<div>
		<loading-component :loading="true"/>
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
								<input class="form-control mb-3 mb-lg-2 mb-sm-2 mb-xxl-2" type="text" placeholder="Search"/>
							</div>
							<!-- Categories -->
							<div>
								<h4>Category</h4>
								<ul class="m-4">
									<template v-for="item in categoryList" :key="item.id">
										<div>
											<input :id="item.name" class="m-1" type="checkbox" :value="item.id" :name="item.name" v-model="categoryIdListSelected"/>
											<label :for="item.name">{{ item.name }}</label>
										</div>
									</template>
								</ul>
							</div>
							<!-- Brands -->
							<div>
								<h4>Brand</h4>
								<ul class="m-4">
									<template v-for="item in brandList" :key="item.id">
										<div>
											<input :id="item.name" class="m-1" type="checkbox" :value="item.id" :name="item.name" v-model="brandIdListSelected"/>
											<label :for="item.name">{{ item.name }}</label>
										</div>
									</template>
								</ul>
							</div>
							<!-- Price -->
							<div>
								<h4>Price</h4>
								<ul class="m-4">
									<template v-for="priceRange in priceRanges" :key="priceRange.value">
										<div>
											<input :id="priceRange.label" class="m-1" type="checkbox" :value="priceRange.value" :name="priceRange.label" v-model="priceRangeListSelected"/>
											<label :for="priceRange.label">{{ priceRange.label }}</label>
										</div>
									</template>
								</ul>
							</div>
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
						<div>
							<div class="filters-content">
								<div class="row grid">
									<product-component
										v-for="product in products"
										:key="product.name"
										:class="PRODUCT_RESPONSIVE_CLASS.four"
										:product="product"
									/>
								</div>
							</div>
						</div>
						<div class="col-md-12">
							<page-component :page="0" :total-page="10" @page-change.prevent="() => {}"/>
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
import {defineComponent, reactive} from "vue";
import {ProductModel} from "@/base/model/ProductModel";
import {PRODUCT_RESPONSIVE_CLASS} from "@/plugins/utils";
import ProductComponent from "@/components/product/ProductComponent.vue";
import PageComponent from "@/components/pages/PageComponent.vue";
import LoadingComponent from "@/components/loading/LoadingComponent.vue";

export default defineComponent({
	name: 'ProductPage',
	components: {
		HeaderComponent,
		FooterComponent,
		ProductComponent,
		PageComponent,
		LoadingComponent
	},
	data() {
		return {
			brandIdListSelected: [],
			categoryIdListSelected: [],
			priceRangeListSelected: [],
		}
	},
	setup() {
		const products = reactive([
			{
				name: 'Product 1',
				price: 100,
				description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!',
				imageThumbnail: 'src/assets/images/product_01.jpg',
				rating: 1,
				totalReviews: 12,
			},
			{
				name: 'Product 1',
				price: 100,
				description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!',
				imageThumbnail: 'src/assets/images/product_01.jpg',
				rating: 4,
				totalReviews: 12,
			},
			{
				name: 'Product 1',
				price: 100,
				description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!',
				imageThumbnail: 'src/assets/images/product_01.jpg',
				rating: 5,
				totalReviews: 12,
			},
			{
				name: 'Product 1',
				price: 100,
				description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!',
				imageThumbnail: 'src/assets/images/product_01.jpg',
				rating: 3,
				totalReviews: 12,
			},
			{
				name: 'Product 1',
				price: 100,
				description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!',
				imageThumbnail: 'src/assets/images/product_01.jpg',
				rating: 4,
				totalReviews: 12,
			},
			{
				name: 'Product 1',
				price: 100,
				description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!',
				imageThumbnail: 'src/assets/images/product_01.jpg',
				rating: 4,
				totalReviews: 12,
			}] as ProductModel[]);
		const categoryList = [
			{id: 1, name: 'Category 1'},
			{id: 2, name: 'Category 2'},
			{id: 3, name: 'Category 3'},
			{id: 4, name: 'Category 4'},
			{id: 5, name: 'Category 5'},
		];
		const brandList = [
			{id: 1, name: 'Brand 1'},
			{id: 2, name: 'Brand 2'},
			{id: 3, name: 'Brand 3'},
			{id: 4, name: 'Brand 4'},
			{id: 5, name: 'Brand 5'},
		];
		const priceRanges = [
			{value: 1, label: 'Price 1'},
			{value: 2, label: 'Price 2'},
			{value: 3, label: 'Price 3'},
			{value: 4, label: 'Price 4'},
			{value: 5, label: 'Price 5'},
		];
		return {
			products,
			categoryList,
			brandList,
			priceRanges,
			PRODUCT_RESPONSIVE_CLASS
		}
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

/* Optional: Add some spacing between the checkboxes */
.m-2 {
	margin-right: 8px;
}

/* Optional: Add margin to the list items */
.m-4 {
	margin-bottom: 15px;
}

@media (max-width: 767px) {
	.filters {
		margin-bottom: 30px;
	}
}
</style>