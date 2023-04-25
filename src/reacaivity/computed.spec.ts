import { computed } from "../computed"
import { reactive } from "../reactive"

it('computed...', () => {

    const user = reactive({
        age: 1
    })

    const age = computed(() => {
        return user.age
    })
    expect(age.value).toBe(1)
})