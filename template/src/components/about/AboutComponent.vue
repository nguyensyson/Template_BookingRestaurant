<script lang="tsx">
import {defineComponent} from "vue";
import LoadingButtonComponent from "@/components/button/LoadingButtonComponent.vue";

export default defineComponent({
	name: 'AboutComponent',
	components: {
		LoadingButtonComponent
	},
	setup() {
		return () => (
			<div class="about-features">
				<div class="best-features">
					<div class="container">
						<div class="row">
							<div class="col-md-12">
								<div class="section-heading">
									<h2>About template</h2>
								</div>
							</div>
							<div class="col-md-6">
								<div class="left-content">
									<h4>Looking for the best products?</h4>
									<p><a rel="nofollow" href="https://github.com/pudo58" target="_blank">This
										template</a> is free by <b>pudo58</b></p>
									<ul class="featured-list">
										<li><a href="#">Lorem ipsum dolor sit amet</a></li>
										<li><a href="#">Consectetur an adipisicing elit</a></li>
										<li><a href="#">It aquecorporis nulla aspernatur</a></li>
										<li><a href="#">Corporis, omnis doloremque</a></li>
										<li><a href="#">Non cum id reprehenderit</a></li>
									</ul>
									<loading-button-component text="Read More" loading={false}/>
								</div>
							</div>
							<div class="col-md-6">
								<div class="right-image">
									<img src="src/assets/images/feature-image.jpg" alt=""/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});
</script>

<style>

.about-features {
	margin-top: 100px !important;
}

.about-features p {
	border-bottom: 1px solid #eee;
	padding-bottom: 20px;
}

.about-features .container .row {
	padding-bottom: 0 !important;
	border-bottom: none !important;
}

.best-features {
	margin-top: 50px;
}

.best-features .container .row {
	border-bottom: 1px solid #eee;
	padding-bottom: 60px;
}

.best-features img {
	width: 100%;
	overflow: hidden;
}

.best-features h4 {
	font-size: 17px;
	color: #1a6692;
	margin-bottom: 20px;
}

.best-features ul.featured-list li {
	display: block;
	margin-bottom: 10px;
}

.best-features p {
	margin-bottom: 25px;
}

.best-features ul.featured-list li a {
	font-size: 14px;
	color: #4a4a4a;
	font-weight: 300;
	transition: all .3s;
	position: relative;
	padding-left: 13px;
}

.best-features ul.featured-list li a:before {
	content: '';
	width: 5px;
	height: 5px;
	display: inline-block;
	background-color: #4a4a4a;
	position: absolute;
	left: 0;
	transition: all .3s;
	top: 8px;
}

.best-features ul.featured-list li a:hover {
	color: #f33f3f;
}

.best-features ul.featured-list li a:hover::before {
	background-color: #f33f3f;
}
</style>