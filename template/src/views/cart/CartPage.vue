<script lang="ts">
import {defineComponent} from "vue";
import HeaderComponent from "@/components/header/Header.vue";
import FooterComponent from "@/components/footer/Footer.vue";
import type {ProductModel} from "@/base/model/product.model";
import {formatMoney} from "../../plugins/utils";

export default defineComponent({
	name: 'CartPage',
	components: {
		HeaderComponent,
		FooterComponent
	},
	data() {
		return {
			cartList: [] as ProductModel[],
		}
	},
	created() {
		this.getCartList();
	},
	methods: {
		formatMoney,
		getCartList() {
			const cartList = localStorage.getItem('cartList');
			console.log(1, cartList)
			this.cartList = cartList ? JSON.parse(cartList) : [];
		},
		deleteCart(id: number | undefined) {
			const cartList = localStorage.getItem('cartList');
			let cartListParse = cartList ? JSON.parse(cartList) : [];
			cartListParse = cartListParse.filter((item: ProductModel) => item.id !== id);
			localStorage.setItem('cartList', JSON.stringify(cartListParse));
			this.getCartList();
		},
		redirectToCheckout() {
			this.$router.push({name: 'checkout'});
		}
	}
});
</script>

<template>
	<div>
		<header-component/>
		<div class="container">
			<div class="row">
				<div class="col-12">
					<h1>Giỏ hàng</h1>
				</div>
			</div>
			<div>
				<section class="h-100" style="background-color: #eee;">
					<div class="container h-100 py-5">
						<div class="row d-flex justify-content-center align-items-center h-100 mb-3">
							<div class="col-10">
								<div class="d-flex justify-content-between align-items-center">
									<h3 class="fw-normal mt-4 text-black">Giỏ hàng</h3>
								</div>
								<div class="card rounded-3 mb-4" v-for="item in cartList">
									<div class="card-body p-4">
										<div class="row d-flex justify-content-between align-items-center">
											<div class="col-md-1">
												<input type="checkbox" class="check" :value="item.id">
											</div>
											<div class="col-md-2 col-lg-2 col-xl-2">
												<img
													:src="item.imageThumbnail"
													class="img-fluid rounded-3">
											</div>
											<div class="col-md-3 col-lg-3 col-xl-3">
												<p class="lead fw-normal mb-2">{{ item.name }}</p>>
											</div>
											<div class="col-md-3 col-lg-3 col-xl-2 d-flex">
												<button class="btn btn-link px-2">
													<i class="bi bi-dash"></i>
												</button>
												<input min="0" name="quantity" :value="item.quantity" type="number" class="form-control form-control-sm"/>
												<button class="btn btn-link px-2">
													<i class="bi bi-plus"></i>
												</button>
											</div>
											<div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
												<h5 title="Giá" class="mb-0">Giá : <span class="fw-bold">
												{{ formatMoney(item.price) }}
									</span></h5>
											</div>
											<div class="col-md-1 col-lg-1 col-xl-1 text-end">
												<a role="button" title="Xóa" class="text-danger" @click.prevent="deleteCart(item.id)"><i class="bi bi-trash"></i></a>
											</div>
										</div>
									</div>
								</div>
								<div class="card" v-if="cartList?.length > 0">
									<div class="card-body">
										<button type="button" class="btn btn-warning btn-block btn-lg" @click.prevent="redirectToCheckout()">Thanh toán
										</button>
									</div>
								</div>
								<div class="card" v-if="cartList?.length == 0">
									<div class="card-body">
										<p class="lead fw-normal mb-2">Giỏ hàng trống</p>
									</div>
								</div>

							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
		<footer-component/>
	</div>
</template>

<style scoped>

</style>