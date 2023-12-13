<script lang="tsx">
import {defineComponent, ref, watch} from "vue";
import {RouterLink} from "vue-router";

export default defineComponent({
	name: 'HeaderComponent',
	components: {
		RouterLink
	},
	props: {
		showHeader: {
			type: Boolean,
			default: true,
		},
	},
	setup(props) {
		const isShow = ref(props.showHeader);
		const productUri = ['/product', '/products'];
		const comboUri = ['/combos', '/combo'];
		const bookingUri = ['/booking', '/bookings'];
		const newsUri = ['/blog', '/blogs'];
		const cartUri = ['/cart'];

		const activeMenu = (uri: string[]) => {
			let currentUri = window.location.pathname;
			let active = false;
			uri.forEach((item) => {
				if (currentUri === item) {
					active = true;
				}
			});
			return active;
		};
		const scrollHandler = () => {
			let scroll = window.scrollY || document.documentElement.scrollTop;
			let header = document.querySelector('header')?.offsetHeight || 0;

			if (scroll >= header) {
				document.querySelector('header')?.classList.add('background-header');
			} else {
				document.querySelector('header')?.classList.remove('background-header');
			}
		};

		const isLogin = () => {
			return localStorage.getItem('token') != null && localStorage.getItem('isLogin') != null && localStorage.getItem('isLogin') == 'true';
		}

		window.addEventListener('scroll', scrollHandler);
		watch(isShow, (value) => {
			if (value) {
				window.addEventListener('scroll', scrollHandler);
			} else {
				window.removeEventListener('scroll', scrollHandler);
			}
		});
		return () => (
			<div>
				{isShow.value && (
					<header class="">
						<nav class="navbar navbar-expand-lg">
							<div class="container">
								<router-link title="Trang chủ" class="navbar-brand" to={'/home'}><h2>Template <em>Clothing</em></h2></router-link>
								<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
									<span class="navbar-toggler-icon"></span>
								</button>
								<div class="collapse navbar-collapse" id="navbarResponsive">
									<ul class="navbar-nav ml-auto">
										<li class="nav-item" role="button" title="Sản phẩm">
											<router-link to={"/products"} class={{'nav-link' : true,'active' : activeMenu(productUri)}} id="product">Sản phẩm</router-link>
										</li>
										<li class="nav-item" role="button" title="Combo">
											<router-link to={"/combos"} class={{'nav-link' : true,'active' : activeMenu(comboUri)}} id="combo">Combo</router-link>
										</li>
										<li class="nav-item" role="button" title="Đặt lịch">
											<router-link to={"/bookings"} class={{'nav-link' : true,'active' : activeMenu(bookingUri)}} id="about">Đặt lịch</router-link>
										</li>
										<li class="nav-item" role="button" title="Tin tức">
											<router-link to={"/blogs"} class={{'nav-link' : true,'active' : activeMenu(newsUri)}} id="contact">Tin tức</router-link>
										</li>
										{
											!isLogin() && (
												<li class="nav-item" role="button" title="Đăng nhập">
													<router-link to={"/login"} className={{'nav-link' : true}}>Đăng nhập</router-link>
												</li>
											)
										}
										{isLogin() && (
											<li class="nav-item" role="button" title="Giỏ hàng">
												<router-link to={"/cart"} class={{'nav-link' : true,'active' : activeMenu(cartUri)}} id="cart">
													<i class="bi bi-cart p-1"></i>
													Giỏ hàng
												</router-link>
											</li>
										)}
									</ul>
								</div>
							</div>
						</nav>
					</header>
				)}
			</div>
		)
	}
});
</script>

<style lang="css">
header .navbar {
	padding: 17px 0;
}

.background-header .navbar {
	padding: 17px 0;
}

.background-header {
	top: 0;
	position: fixed;
	background-color: #fff !important;
	box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
}

.background-header .navbar-brand h2 {
	color: #121212 !important;
}


.navbar .navbar-brand {
	float: left;
	margin-top: -12px;
	outline: none;
}

.navbar .navbar-brand h2 {
	color: #fff;
	text-transform: uppercase;
	font-size: 24px;
	font-weight: 700;
	-webkit-transition: all .3s ease 0s;
	-moz-transition: all .3s ease 0s;
	-o-transition: all .3s ease 0s;
	transition: all .3s ease 0s;
}

.navbar .navbar-brand h2 em {
	font-style: normal;
	color: #f33f3f;
}

#navbarResponsive {
	z-index: 999;
}

.navbar-collapse {
	text-align: center;
}

.navbar .navbar-nav .nav-item {
	margin: 0 15px;
}

.navbar .navbar-nav a.nav-link {
	text-transform: capitalize;
	font-size: 15px;
	font-weight: 500;
	letter-spacing: 0.5px;
	color: #fff;
	transition: all 0.5s;
	margin-top: 5px;
}
.navbar .navbar-toggler-icon {
	background-image: none;
}

.navbar .navbar-toggler {
	border-color: #fff;
	background-color: #fff;
	height: 36px;
	outline: none;
	border-radius: 0;
	position: absolute;
	right: 30px;
	top: 20px;
}

.navbar .navbar-toggler-icon:after {
	content: '\f0c9';
	color: #f33f3f;
	font-size: 18px;
	line-height: 26px;
	font-family: 'FontAwesome',serif;
}

@media (max-width: 768px) {
	.navbar .navbar-nav .nav-item {
		margin: 0 5px;
	}
}
</style>