<script lang="tsx">
import {defineComponent, ref} from "vue";
import HeaderComponent from '@/components/header/Header.vue';
import FooterComponent from '@/components/footer/Footer.vue';
import ProductComponent from '@/components/product/ProductComponent.vue';
import BannerComponent from '@/components/banner/BannerComponent.vue';
import {PRODUCT_RESPONSIVE_CLASS} from "@/plugins/utils";
import AboutComponent from "@/components/about/AboutComponent.vue";
import BuyNowComponent from "@/components/buynow/BuyNowComponent.vue";
import LoadingComponent from "@/components/loading/LoadingComponent.vue";
export default defineComponent({
	name : 'HomePage',
	components : {
		HeaderComponent,
		FooterComponent,
		ProductComponent,
		BannerComponent,
		AboutComponent,
		BuyNowComponent,
		LoadingComponent
	},
	setup(){
		const products = ref([
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
			}]);
		const loadingComponent = <LoadingComponent loading={true}/>

		return () => (
			<div class="container-fluid">
				{loadingComponent}
				<header-component/>
				<banner-component/>
				<div class="container ">
					<div class="col-md-12 mt-3">
						<div class="section-heading">
							<h2>Latest Products</h2>
							<a href="products.html">view all products <i class="fa fa-angle-right"></i></a>
						</div>
					</div>
					<div class="row align-items-center">
						{
							products.value.map((product, index) => (
								<product-component class={PRODUCT_RESPONSIVE_CLASS.four} product={product} key={index}/>
							))
						}
					</div>
				</div>
				<about-component/>
				<buy-now-component/>
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