package com.codestates.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    MEMBER_NOT_LOGIN(403, "Member not login"),
    COFFEE_NOT_FOUND(404, "Coffee not found"),
    COFFEE_CODE_EXISTS(409, "Coffee Code exists"),
    ORDER_NOT_FOUND(404, "Order not found"),
    CANNOT_CHANGE_ORDER(403, "Order can not change"),
    CANNOT_CHANGE_QUESTION(403, "Question can not change"),
    CANNOT_DELETE_QUESTION(403, "Question can not delete"),
    CANNOT_CHANGE_ANSWER(403, "Answer can not change"),
    CANNOT_DELETE_ANSWER(403, "Answer can not delete"),
    CANNOT_CHANGE_COMMENT(403, "Comment can not change"),
    CANNOT_DELETE_COMMENT(403, "Comment can not delete"),
    NOT_IMPLEMENTATION(501, "Not Implementation"),
    INVALID_MEMBER_STATUS(400, "Invalid member status"),
    QUESTION_NOT_FOUND(404,"Question not found"),
    QUESTION_MEMBER_NOT_MATCH(1004,"Question memberId not match"),
    SECRET_QUESTION_QUESTIONID_NOT_MATCH(1818,"Qustion memberId Answer memberId not match and not admin"),
    ANSWER_NOT_MATCH(404,"Answer is not match"),
    ANSWER_MEMBER_NOT_MATCH(404,"Answer's member not match"),
    ANSWER_NOT_FOUND(404,"Answer not found"),
    OPTION_NOT_FOUND(404,"Option not found");
    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
