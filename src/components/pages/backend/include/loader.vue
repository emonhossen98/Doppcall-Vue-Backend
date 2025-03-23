<template>
    <div id="global-loader">
			<img :src="LoaderImage" class="loader-img" alt="Loaders">
		</div>
</template>

<script>
import LoaderImage from '../../../../assets/image/loader.svg';
export default {
    data() {
        return {
            LoaderImage
        };
    }
}
</script>
<style>
#global-loader {
	position: absolute;
	width: 3%;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
	z-index: 9999;
}
</style>