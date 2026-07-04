# from app.core.ai_client import get_gemini_client
# from app.core.config import settings
# from app.core.prompts import SYSTEM_PROMPT

# from app.schemas.ai import AIInsightResponse


# class AIService:

#     def generate_insights(
#         self,
#         context: str,
#     ) -> AIInsightResponse:

#         client = get_gemini_client()

#         response = client.models.generate_content(
#             model=settings.gemini_model,
#             contents=f"""
# {SYSTEM_PROMPT}

# {context}
# """,
#         )

#         content = response.text.strip()

#         if content.startswith("```"):
#             content = content.replace("```json", "")
#             content = content.replace("```", "")
#             content = content.strip()

#             return AIInsightResponse.model_validate_json(content)




from app.core.ai_client import get_gemini_client
from app.core.config import settings
from app.core.prompts import SYSTEM_PROMPT
from app.schemas.ai import AIInsightResponse


class AIService:

    def generate_insights(self, context: str) -> AIInsightResponse:
        client = get_gemini_client()

        response = client.models.generate_content(
            model=settings.gemini_model,
            contents=f"{SYSTEM_PROMPT}\n\n{context}",
        )

        print("\n===== GEMINI RAW RESPONSE =====")
        print(response.text)
        print("===============================\n")

        content = response.text.strip()

        if content.startswith("```"):
            content = content.replace("```json", "")
            content = content.replace("```", "").strip()

        return AIInsightResponse.model_validate_json(content)