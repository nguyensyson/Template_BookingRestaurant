<script lang="tsx">
import {defineComponent, reactive} from "vue";
import HeaderComponent from '@/components/header/Header.vue';
import FooterComponent from '@/components/footer/Footer.vue';
import ProductComponent from '@/components/product/ProductComponent.vue';
import BannerComponent from '@/components/banner/BannerComponent.vue';
import {PRODUCT_RESPONSIVE_CLASS} from "@/plugins/utils";
import AboutComponent from "@/components/about/AboutComponent.vue";
import BuyNowComponent from "@/components/buynow/BuyNowComponent.vue";
import LoadingComponent from "@/components/loading/LoadingComponent.vue";
import {ProductService} from "@/base/service/product-service";
import type {ProductModel} from "@/base/model/product.model";
import {Pageable} from "@/base/model/base.model";

export default defineComponent({
	name: 'HomePage',
	components: {
		HeaderComponent,
		FooterComponent,
		ProductComponent,
		BannerComponent,
		AboutComponent,
		BuyNowComponent,
		LoadingComponent
	},
	setup() {
		const loadingComponent = <LoadingComponent loading={true}/>
		let productPage = reactive(new Pageable<ProductModel>());
		let productList = reactive([] as ProductModel[]);
		let comboPage = reactive(new Pageable<ProductModel>());
		let comboList = reactive([] as ProductModel[]);
		let productService = new ProductService();
		const findProductPage = () => {
			productService.findBySearch({
				page: 0,
				size: 6
			}).then((response) => {
				productPage = response.data;
				if (productPage.content) {
					productList = productPage.content;
				}
			})
		}

		const findComboPage = () => {
			productService.findCombo({
				page: 0,
				size: 6,
				name: null as unknown as string,
			}).then((response) => {
				comboPage = response.data;
				if (comboPage.content) {
					comboList = comboPage.content;
				}
			})
		}

		findProductPage();
		findComboPage();

		return () => (
			<div class="container-fluid">
				{loadingComponent}
				<header-component/>
				<banner-component/>
				<div class="container ">
					<div class="col-md-12 mt-3">
						<div class="section-heading">
							<h2>Sản phẩm</h2>
							<router-link to={'/products'}>Xem tất cả sản phẩm <i class="fa fa-angle-right"></i>
							</router-link>
						</div>
					</div>
					<div class="row align-items-center">
						{
							productList.map((product, index) => (
								<product-component class={PRODUCT_RESPONSIVE_CLASS.four} product={product} key={index}/>
							))
						}
					</div>
				</div>
				<div class="container ">
					<div class="col-md-12 mt-3">
						<div class="section-heading">
							<h2>Combo</h2>
							<router-link to={"/combos"}>Xem tất cả combo<i class="fa fa-angle-right"></i></router-link>
						</div>
					</div>
					<div class="row align-items-center">
						
					</div>
				</div>
				
				<footer-component/>
			</div>
		)
	}
})
</script>

<style lang="css" scoped>
.section-heading {
	text-align: left;
	margin-bottom: 60px;
	border-bottom: 1px solid #eee;
}

.section-heading h2 {
	font-size: 28px;
	font-weight: 400;
	color: #1e1e1e;
	margin-bottom: 15px;
}

</style>