<script lang="tsx">
import {defineComponent, reactive} from "vue";
import type {BlogModel} from "@/base/model/blog.model";
import BlogComponent from "@/components/blog/BlogComponent.vue";
import HeaderComponent from "@/components/header/Header.vue";
import LoadingButtonComponent from "@/components/button/LoadingButtonComponent.vue";
import FooterComponent from "@/components/footer/Footer.vue";
import LoadingComponent from "@/components/loading/LoadingComponent.vue";
import BannerComponent from "@/components/banner/BannerComponent.vue";
export default defineComponent({
	name: 'BlogPage',
	components: {
		BlogComponent,
		HeaderComponent,
		LoadingButtonComponent,
		FooterComponent,
		LoadingComponent,
		BannerComponent
	},
	setup() {
		const blogList = reactive([
			{
				content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.',
				createdAt: new Date(),
				title: 'Sample blog post'
			},
			{
				content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.',
				createdAt: new Date(),
				title: 'Sample blog post'
			},
			{
				content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.',
				createdAt: new Date(),
				title: 'Sample blog post'
			}
		] as BlogModel[]);
		const header = <header-component/>;
		const footer = <footer-component/>;
		const loadingComponent = <loading-component loading={true}/>;
		const bannerComponent = <banner-component/>;
		const blogComponent = (
			<div class="container mt-3">
				<h3 class="mb-3">Tin tức</h3>
				<div class="row">
					<div class="col-sm-8 blog-main">
						{blogList.map((blog, index) => {
							return <blog-component class="mb-4" blog={blog} key={index}/>
						})}
					</div>
				</div>
			</div>
		);
		return () => (
			<div>
				{header}
				{bannerComponent}
				{loadingComponent}
				{blogComponent}
				{footer}
			</div>
		)
	}
})
</script>

<style scoped>

</style>