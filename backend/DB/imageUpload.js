import { v2 as cloudinary } from "cloudinary";

export const uploadImage = async function (profilePic, name) {
	// Configuration
	cloudinary.config({
		cloud_name: "dwuvpvtpj",
		api_key: "881814146751956",
		api_secret: `${process.env.CLOUDINARY_API_SECRET}`,
	});

	// Upload an image
	const uploadResult = await cloudinary.uploader
		.upload(profilePic, {
			folder: "profile_pics",
			width: 400,
			height: 400,
			crop: "scale",
			public_id: name,
			overwrite: true,
		})
		.catch((error) => {
			console.log(error);
		});

	return uploadResult.secure_url;
};
