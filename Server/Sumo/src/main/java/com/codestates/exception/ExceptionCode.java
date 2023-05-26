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
    OPTION_NOT_FOUND(404,"Option not found"),
    SCHEDULE_NOT_FOUND(404, "Schedule not found"),
    CANNOT_ACCESS_SCHEDULE(403, "Can not access to schedule"),
    SCHEDULE_EXISTS(409, "Schedule already exists this date"),
    INVALID_TIME_SETTING(400, "EndTime must be later"),
    FILE_CONVERT_FAILED(500, "MultipartFile cannot convert to file"),
    EMAIL_CONFLICT(409,"이미 가입된 이메일 입니다."),
    NICKNAME_CONFLICT(409,"이미 사용중인 닉네임 입니다."),
    BOARD_NOT_FOUND(404,"Board not found"),
    BOARD_ACCESS_DENIED(404, "Only the Author can modify it"),
    ALREADY_LIKED(404, "Already liked"),
    NOT_LIKED_YET(404, "Not liked yet"),
    INVALID_ORDER_BY_PARAMETER(404, "Invalid order by parameter"),
    COMMENT_NOT_FOUND(404,"Comment not found"),
    COMMENT_ACCESS_DENIED(404, "Comment Access Denied"),
    ERROR_WHILE_UPLOADING_FILE_TO_S3(404,"ERROR_WHILE_UPLOADING_FILE_TO_S3"),
    ERROR_WHILE_CONVERTING_MULTIPART_FILE_TO_FILE(404,"ERROR_WHILE_CONVERTING_MULTIPART_FILE_TO_FILE"),
    ALREADY_POSTED_THIS_MONTH(404,"Already Posted This Month");



    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
