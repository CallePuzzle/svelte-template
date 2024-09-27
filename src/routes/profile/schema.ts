import Vine from '@vinejs/vine';

const schema = Vine.object({
	name: Vine.string(),
	picture: Vine.string().url({
		require_protocol: true,
		protocols: ['https']
	})
});

const defaults = {
	name: '',
	picture: ''
};

export { schema, defaults };