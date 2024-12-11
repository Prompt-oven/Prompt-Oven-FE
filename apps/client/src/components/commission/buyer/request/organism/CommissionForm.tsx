"use client"
/* eslint-disable no-console -- 개발 중 디버깅을 위해 console 사용을 허용 */
import { useState } from "react"
import { Calendar } from "@repo/ui/lucide"
import { Button } from "@repo/ui/button"
import { Input } from "@repo/ui/input"
import { Textarea } from "@repo/ui/textarea"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@repo/ui/select"
import { Calendar as CalendarComponent } from "@repo/ui/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "@repo/ui/popover"
import { commissionSchema } from "@/schema/commissionRequest"
import { useRouter } from "next/navigation"
import { FormField } from "../molecule/FormField"

export function CommissionForm() {
	const router = useRouter()
	const [date, setDate] = useState<Date>()
	const [formValues, setFormValues] = useState({
		title: "",
		price: 0,
		description: "",
		deadline: new Date(),
		model: "gpt4",
		category: "코딩",
		additional: "",
	})

	const [errors, setErrors] = useState<
		Partial<Record<keyof typeof formValues, string>>
	>({})

	const validateField = (
		field: keyof typeof formValues,
		value: unknown,
		currentValues: typeof formValues,
	) => {
		const partialValues = { ...currentValues, [field]: value }
		const result = commissionSchema.safeParse(partialValues)

		if (!result.success) {
			const fieldError = result.error.errors.find(
				(err) => err.path[0] === field,
			)
			return fieldError ? fieldError.message : undefined
		}
		return undefined
	}

	const handleChange = <K extends keyof typeof formValues>(
		field: K,
		value: (typeof formValues)[K],
	) => {
		setFormValues((prev) => ({
			...prev,
			[field]: value,
		}))

		const error = validateField(field, value, formValues)
		setErrors((prev) => ({
			...prev,
			[field]: error,
		}))
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const validationResult = commissionSchema.safeParse(formValues)
		if (!validationResult.success) {
			const fieldErrors: Partial<Record<keyof typeof formValues, string>> = {}
			validationResult.error.errors.forEach((err) => {
				const fieldName = err.path[0] as keyof typeof formValues
				fieldErrors[fieldName] = err.message
			})
			setErrors(fieldErrors)
			return
		}

		try {
			const response = await fetch(
				`${process.env.API_BASE_URL}/v1/commission`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formValues),
				},
			)

			if (response.ok) {
				setFormValues({
					title: "",
					price: 0,
					description: "",
					deadline: new Date(),
					model: "gpt4",
					category: "코딩",
					additional: "",
				})
				router.push("/commission/payment")
			} else {
				console.error("Failed to create commission")
			}
		} catch (error) {
			console.error("Error submitting form:", error)
		}
	}

	return (
		<form className="space-y-8" onSubmit={handleSubmit}>
			<FormField
				id="title"
				label="Commission Title"
				required
				description="Give your commission a clear and descriptive title"
				error={errors.title}>
				<Input
					id="title"
					placeholder="Enter commission title"
					className="border-gray-700 bg-gray-900"
					onChange={(e) => handleChange("title", e.target.value)}
				/>
			</FormField>

			<FormField
				id="price"
				label="Price"
				required
				description="Set the price for your commission"
				error={errors.price}>
				<Input
					id="price"
					type="number"
					placeholder="Enter price"
					className="border-gray-700 bg-gray-900"
					onChange={(e) => handleChange("price", parseFloat(e.target.value))}
				/>
			</FormField>

			<FormField
				id="description"
				label="Description"
				required
				description="Provide detailed information about your commission request"
				error={errors.description}>
				<Textarea
					id="description"
					placeholder="Enter commission details"
					className="min-h-[120px] border-gray-700 bg-gray-900"
					onChange={(e) => handleChange("description", e.target.value)}
				/>
			</FormField>

			<FormField
				id="deadline"
				label="Deadline"
				required
				description="Select the desired completion date"
				error={errors.deadline}>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							className="w-full justify-start border-gray-700 bg-gray-900 text-left font-normal">
							<Calendar className="mr-2 h-4 w-4" />
							{date ? date.toLocaleDateString() : "Select a date"}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto bg-gray-900 p-0">
						<CalendarComponent
							mode="single"
							selected={date}
							onSelect={(selectedDate) => {
								setDate(selectedDate)
								if (selectedDate) {
									handleChange("deadline", selectedDate)
								}
							}}
							initialFocus
						/>
					</PopoverContent>
				</Popover>
			</FormField>

			<FormField
				id="model"
				label="LLM Model"
				required
				description="Select the AI model for your commission"
				error={errors.model}>
				<Select onValueChange={(value) => handleChange("model", value)}>
					<SelectTrigger className="border-gray-700 bg-gray-900">
						<SelectValue placeholder="Select a model" />
					</SelectTrigger>
					<SelectContent className="border-gray-700 bg-gray-900">
						<SelectItem value="gpt4">GPT-4</SelectItem>
						<SelectItem value="DALL-E">DALL-E</SelectItem>
					</SelectContent>
				</Select>
			</FormField>

			<FormField
				id="category"
				label="Category"
				description="Select the category that best fits your commission"
				error={errors.category}>
				<Select onValueChange={(value) => handleChange("category", value)}>
					<SelectTrigger className="border-gray-700 bg-gray-900">
						<SelectValue placeholder="Select a category" />
					</SelectTrigger>
					<SelectContent className="border-gray-700 bg-gray-900">
						<SelectItem value="코딩">코딩</SelectItem>
						<SelectItem value="문서">문서</SelectItem>
						<SelectItem value="그림">그림</SelectItem>
						<SelectItem value="음악">음악</SelectItem>
					</SelectContent>
				</Select>
			</FormField>

			<FormField
				id="additional"
				label="Additional Requirements"
				description="Any additional requirements or special requests"
				error={errors.additional}>
				<Textarea
					id="additional"
					placeholder="Enter additional requirements"
					className="min-h-[100px] border-gray-700 bg-gray-900"
					onChange={(e) => handleChange("additional", e.target.value)}
				/>
			</FormField>

			<Button
				type="submit"
				className="w-full bg-purple-600 hover:bg-purple-700">
				Create Commission
			</Button>
		</form>
	)
}

// zod 유효성 검사
// FormData POST 로 서버에 전송
// 성공 시 결제 페이지로 리다이렉트
// 실패 시 에러 메시지 표시