export async function editarDadosPerfil(dados_formulario) {
	const url = "http://localhost:3000/usuario_perfil";
	const options = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(dados_formulario),
	};
	try {
		const response = await fetch(url, options);
		const data = await response.json();

		if (response.ok) {
			console.log("Informações atualizadas com sucesso:", data);
		} else {
			console.error("Erro ao atualizar informações:", data);
		}
	} catch (error) {
		console.error("Erro na requisição:", error);
	}
}
