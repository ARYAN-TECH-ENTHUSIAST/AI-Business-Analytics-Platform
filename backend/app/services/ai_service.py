from openai import APIError

from app.core.ai_client import get_openai_client
from app.core.prompts import SYSTEM_PROMPT

from app.schemas.ai import AIInsightResponse


class AIService:

    def generate_insights(
        self,
        context: str,
    ) -> AIInsightResponse:

        try:
            
            client = get_openai_client()
            response = client.chat.completions.create(
                model="gpt-4.1-mini",
                response_format={
                    "type": "json_object",
                },
                messages=[
                    {
                        "role": "system",
                        "content": SYSTEM_PROMPT,
                    },
                    {
                        "role": "user",
                        "content": context,
                    },
                ],
            )

            return AIInsightResponse.model_validate_json(
                response.choices[0].message.content
            )

        except APIError as exc:
            raise RuntimeError(
                f"OpenAI Error: {exc}"
            )